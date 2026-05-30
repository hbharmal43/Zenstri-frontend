'use client';

import { useEffect, useState } from 'react';
import { doc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Audit {
  id: string;
  status: string;
  summary?: string;
  projectId: string;
}

export interface Log {
  id: string;
  message: string;
  level?: string;
  timestamp?: any;
}

export interface Finding {
  id: string;
  title: string;
  severity: string;
  status: string;
  description?: string;
}

export function useAuditStream(auditId: string | null) {
  const [audit, setAudit] = useState<Audit | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auditId) {
      setAudit(null);
      setLogs([]);
      setFindings([]);
      return;
    }

    const unsubAudit = onSnapshot(
      doc(db, 'audits', auditId),
      (snap) => {
        if (snap.exists()) {
          setAudit({ id: snap.id, ...snap.data() } as Audit);
        }
      },
      (err) => {
        console.error('Audit sync error:', err);
        setError(err.message);
      }
    );

    const logsRef = collection(db, 'audits', auditId, 'logs');
    const logQuery = query(logsRef, orderBy('timestamp', 'asc'));
    const unsubLogs = onSnapshot(
      logQuery,
      (snap) => {
        setLogs(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data()
          } as Log))
        );
      },
      (err) => {
        console.error('Logs sync error:', err);
        setError(err.message);
      }
    );

    const findingsRef = collection(db, 'audits', auditId, 'findings');
    const unsubFindings = onSnapshot(
      findingsRef,
      (snap) => {
        setFindings(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data()
          } as Finding))
        );
      },
      (err) => {
        console.error('Findings sync error:', err);
        setError(err.message);
      }
    );

    return () => {
      unsubAudit();
      unsubLogs();
      unsubFindings();
    };
  }, [auditId]);

  return { audit, logs, findings, error };
}
