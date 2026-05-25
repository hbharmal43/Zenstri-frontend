import { describe, expect, it, vi } from 'vitest';
import { mapSnapshotDocs, subscribeToAuditStreams } from '../firestore.js';

describe('mapSnapshotDocs', () => {
  it('maps Firestore docs to plain objects with ids', () => {
    const snapshot = {
      docs: [
        { id: 'log-1', data: () => ({ message: 'Started' }) },
        { id: 'log-2', data: () => ({ message: 'Finished' }) }
      ]
    };

    expect(mapSnapshotDocs(snapshot)).toEqual([
      { id: 'log-1', message: 'Started' },
      { id: 'log-2', message: 'Finished' }
    ]);
  });
});

describe('subscribeToAuditStreams', () => {
  it('returns an unsubscribe function that cleans all listeners', () => {
    const unsubscribeAudit = vi.fn();
    const unsubscribeLogs = vi.fn();
    const unsubscribeFindings = vi.fn();
    const onSnapshotImpl = vi
      .fn()
      .mockReturnValueOnce(unsubscribeAudit)
      .mockReturnValueOnce(unsubscribeLogs)
      .mockReturnValueOnce(unsubscribeFindings);

    const unsubscribe = subscribeToAuditStreams({
      db: {},
      auditId: 'audit-1',
      onAudit: vi.fn(),
      onLogs: vi.fn(),
      onFindings: vi.fn(),
      deps: {
        docImpl: vi.fn((...parts) => ({ type: 'doc', parts })),
        collectionImpl: vi.fn((...parts) => ({ type: 'collection', parts })),
        orderByImpl: vi.fn((field, direction) => ({ field, direction })),
        queryImpl: vi.fn((ref, order) => ({ ref, order })),
        onSnapshotImpl
      }
    });

    unsubscribe();

    expect(unsubscribeAudit).toHaveBeenCalled();
    expect(unsubscribeLogs).toHaveBeenCalled();
    expect(unsubscribeFindings).toHaveBeenCalled();
  });
});
