import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore';
import { getFirebaseServices } from './firebase.js';

export function mapSnapshotDocs(snapshot) {
  return snapshot.docs.map((entry) => ({
    id: entry.id,
    ...entry.data()
  }));
}

export function subscribeToAuditStreams({
  db = getFirebaseServices().db,
  auditId,
  onAudit,
  onLogs,
  onFindings,
  onError = console.error,
  deps = {}
}) {
  const docImpl = deps.docImpl || doc;
  const collectionImpl = deps.collectionImpl || collection;
  const orderByImpl = deps.orderByImpl || orderBy;
  const queryImpl = deps.queryImpl || query;
  const onSnapshotImpl = deps.onSnapshotImpl || onSnapshot;

  const auditRef = docImpl(db, 'audits', auditId);
  const logsRef = queryImpl(
    collectionImpl(db, 'audits', auditId, 'logs'),
    orderByImpl('createdAt', 'asc')
  );
  const findingsRef = queryImpl(
    collectionImpl(db, 'audits', auditId, 'findings'),
    orderByImpl('createdAt', 'asc')
  );

  const unsubscribers = [
    onSnapshotImpl(auditRef, (snapshot) => onAudit({ id: snapshot.id, ...snapshot.data() }), onError),
    onSnapshotImpl(logsRef, (snapshot) => onLogs(mapSnapshotDocs(snapshot)), onError),
    onSnapshotImpl(findingsRef, (snapshot) => onFindings(mapSnapshotDocs(snapshot)), onError)
  ];

  return () => {
    for (const unsubscribe of unsubscribers) {
      unsubscribe();
    }
  };
}
