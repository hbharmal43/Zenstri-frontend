'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuditStream } from '@/hooks/useAuditStream';
import ConsentModal from '@/components/ConsentModal';

export default function DashboardPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  const [repoFullName, setRepoFullName] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [project, setProject] = useState<any>(null);
  const [activeAuditId, setActiveAuditId] = useState<string | null>(null);
  const [showConsent, setShowConsent] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [auditing, setAuditing] = useState(false);

  const { audit, logs, findings, error: streamError } = useAuditStream(activeAuditId);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="dashboard-page-container">
        <div className="glass-panel complex-glass auth-box align-center">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading secure session...</p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const res = await api.createProject(token!, repoFullName.trim(), liveUrl.trim());
      setProject(res);
      if (res.lastAuditId) {
        setActiveAuditId(res.lastAuditId);
      }
    } catch (err: any) {
      setError(err.message || 'Saving project failed. Please verify credentials.');
    } finally {
      setSaving(false);
    }
  };

  const handleRunAudit = async () => {
    if (!project) return;
    setError('');
    if (!project.consentCurrent) {
      setShowConsent(true);
      return;
    }
    await triggerAudit();
  };

  const handleConsentConfirm = async () => {
    setShowConsent(false);
    setError('');
    try {
      await api.createConsent(token!, project.id);
      setProject({ ...project, consentCurrent: true });
      await triggerAudit();
    } catch (err: any) {
      setError(err.message || 'Consent recording failed.');
    }
  };

  const triggerAudit = async () => {
    setAuditing(true);
    setError('');
    try {
      const res = await api.createAudit(token!, project.id);
      setActiveAuditId(res.id);
    } catch (err: any) {
      setError(err.message || 'Starting security audit enqueuing failed.');
    } finally {
      setAuditing(false);
    }
  };

  const handleConnectGitHub = async () => {
    setError('');
    try {
      const res = await api.getGitHubInstallUrl(token!);
      window.location.href = res.installUrl;
    } catch (err: any) {
      setError(err.message || 'GitHub App install redirection failed.');
    }
  };

  return (
    <main className="dashboard-page-container">
      <div className="hero-backdrop" style={{ backgroundImage: "url('/hero.jpg')" }}></div>
      <div className="hero-overlay"></div>

      <section className="dashboard-panel container animate-fade-in" style={{ zIndex: 10, position: 'relative' }}>
        <div className="dashboard-panel__header">
          <div>
            <p className="eyebrow">Authenticated Dashboard Workspace</p>
            <h2>Audit control room</h2>
          </div>
          <div className="dashboard-panel__user">
            <span className="user-dot"></span>
            Signed in as: <strong>{user.displayName || user.email}</strong>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Project configuration input forms */}
          <form className="dashboard-form glass-panel" onSubmit={handleSaveProject}>
            <label>
              GitHub repository (owner/repo)
              <input 
                value={repoFullName} 
                onChange={e => setRepoFullName(e.target.value)} 
                placeholder="my-github-username/vibe-coded-saas" 
                required 
                disabled={saving}
              />
            </label>
            <label>
              Live production application URL
              <input 
                value={liveUrl} 
                onChange={e => setLiveUrl(e.target.value)} 
                type="url" 
                placeholder="https://my-vibe-app.vercel.app" 
                required 
                disabled={saving}
              />
            </label>
            <div className="dashboard-actions">
              <button 
                className="btn btn-outline" 
                type="button" 
                onClick={handleConnectGitHub}
              >
                Connect GitHub App
              </button>
              <button 
                className="btn btn-primary" 
                type="submit"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save project'}
              </button>
              <button 
                className="btn btn-primary" 
                type="button" 
                onClick={handleRunAudit} 
                disabled={!project || auditing}
              >
                {auditing ? 'Starting...' : 'Run audit'}
              </button>
            </div>
            {(error || streamError) && (
              <p className="dashboard-error">{error || streamError}</p>
            )}
          </form>

          {/* Audit execution status panel */}
          <div className="audit-status-panel glass-panel">
            <h3>Audit Status</h3>
            <div className="status-indicator-block">
              {audit ? (
                <>
                  <div className={`dash-status-badge ${audit.status === 'completed' ? 'safe' : audit.status === 'failed' ? 'danger' : 'running'}`}>
                    <span className={`dash-status-dot ${audit.status === 'completed' ? 'green' : audit.status === 'failed' ? 'red' : 'orange'}`}></span>
                    <span style={{ textTransform: 'capitalize' }}>{audit.status}</span>
                  </div>
                  {audit.summary && <p className="status-summary">{audit.summary}</p>}
                </>
              ) : (
                <p className="status-placeholder">No audits have run yet. Configure your repository details above to launch a security probe.</p>
              )}
            </div>
          </div>
        </div>

        {/* Console logs and vulnerabilities findings grid */}
        {activeAuditId && (
          <div className="dashboard-grid dashboard-grid--results" style={{ marginTop: '2rem' }}>
            <section className="audit-stream glass-panel dark">
              <h3>Agent Execution Logs</h3>
              <div className="terminal-viewport logs-viewport" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {logs.length > 0 ? (
                  logs.map(log => (
                    <div key={log.id} className="terminal-row">
                      {log.message}
                    </div>
                  ))
                ) : (
                  <div className="terminal-row muted">Listening for stream logs...</div>
                )}
              </div>
            </section>
            
            <section className="finding-stream glass-panel">
              <h3>Security Vulnerabilities Findings</h3>
              <div className="findings-viewport" style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {findings.length > 0 ? (
                  findings.map(finding => (
                    <div key={finding.id} className={`finding-card severity-${finding.severity.toLowerCase()}`}>
                      <div className="finding-header">
                        <h4>{finding.title}</h4>
                        <span className={`severity-tag ${finding.severity.toLowerCase()}`}>
                          {finding.severity}
                        </span>
                      </div>
                      {finding.description && <p className="finding-desc">{finding.description}</p>}
                      <span className={`status-tag ${finding.status.toLowerCase()}`}>
                        {finding.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="result-placeholder">
                    <p>No issues detected so far. Zenstri agents are scanning...</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </section>

      {showConsent && (
        <ConsentModal 
          onConfirm={handleConsentConfirm} 
          onCancel={() => setShowConsent(false)} 
        />
      )}
    </main>
  );
}
