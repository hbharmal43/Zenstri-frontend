'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuditStream } from '@/hooks/useAuditStream';
import ConsentModal from '@/components/ConsentModal';

export default function DashboardPage() {
  const { user, token, loading, signOut } = useAuth();
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
      <main className="dashboard-loading-screen">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading secure session...</p>
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
    <main className="dashboard-layout">
      {/* Left Sidebar (All White with thin gray border) */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <img className="logo-svg" src="/assets/logo.svg" alt="Zenstri Logo" />
          <span className="logo-text">Zenstri</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="sidebar-nav-item active">
            <svg className="nav-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Workspace</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <svg className="nav-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Settings</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            <span className="user-avatar-dot"></span>
            <div className="user-meta-col">
              <span className="user-meta-name">{user.displayName || 'Developer'}</span>
              <span className="user-meta-email">{user.email}</span>
            </div>
          </div>
          <button className="btn-sidebar-signout" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Right Workspace Panel (Light Mode Theme) */}
      <section className="dashboard-main">
        {/* Top Header Bar */}
        <header className="dashboard-main-header">
          <div className="header-meta-col">
            <span className="header-eyebrow">Zenstri Control Room</span>
            <h2>Active Audit Workspace</h2>
          </div>
          <div className="header-project-badge">
            <span className="badge-dot orange"></span>
            <span>Production Project Panel</span>
          </div>
        </header>

        {/* Workspace Content */}
        <div className="dashboard-main-content">
          <div className="light-grid-row">
            {/* Project Settings Card */}
            <form className="card-light project-config-card" onSubmit={handleSaveProject}>
              <h3>Project Configuration</h3>
              <p className="card-subtext-light">Configure your workspace target repository and live URL to initialize security probes.</p>

              <div className="input-group-light">
                <label>GitHub repository (owner/repo)</label>
                <input 
                  className="input-light"
                  value={repoFullName} 
                  onChange={e => setRepoFullName(e.target.value)} 
                  placeholder="my-github-username/vibe-coded-saas" 
                  required 
                  disabled={saving}
                />
              </div>

              <div className="input-group-light">
                <label>Live production application URL</label>
                <input 
                  className="input-light"
                  value={liveUrl} 
                  onChange={e => setLiveUrl(e.target.value)} 
                  type="url" 
                  placeholder="https://my-vibe-app.vercel.app" 
                  required 
                  disabled={saving}
                />
              </div>

              <div className="actions-row-light">
                <button 
                  className="btn-light-secondary" 
                  type="button" 
                  onClick={handleConnectGitHub}
                >
                  Connect GitHub App
                </button>
                <button 
                  className="btn-orange" 
                  type="submit"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save project'}
                </button>
                <button 
                  className="btn-orange-outline" 
                  type="button" 
                  onClick={handleRunAudit} 
                  disabled={!project || auditing}
                >
                  {auditing ? 'Initializing...' : 'Run active audit'}
                </button>
              </div>

              {(error || streamError) && (
                <p className="dashboard-error-light">{error || streamError}</p>
              )}
            </form>

            {/* Audit Status Card */}
            <div className="card-light status-overview-card">
              <h3>Audit Diagnostic</h3>
              <p className="card-subtext-light">Current execution state of Zenstri exploitation agents.</p>

              <div className="status-display-block">
                {audit ? (
                  <>
                    <div className={`status-badge-light status-${audit.status}`}>
                      <span className="status-badge-dot"></span>
                      <span>{audit.status}</span>
                    </div>
                    {audit.summary && (
                      <p className="status-summary-text">{audit.summary}</p>
                    )}
                  </>
                ) : (
                  <div className="status-idle-placeholder">
                    <svg className="idle-shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <p>No scans have run yet. Fill in your project configurations and click "Run active audit" to stream logs.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Console Section */}
          {activeAuditId && (
            <div className="results-grid-row-light">
              {/* Agent Monospace Terminal logs */}
              <div className="card-light logs-card-light">
                <h3>Agent Execution Stream</h3>
                <p className="card-subtext-light">Realtime execution trace output of the sandboxed security worker.</p>
                
                <div className="console-light-viewport">
                  {logs.length > 0 ? (
                    logs.map(log => (
                      <div key={log.id} className="console-line">
                        <span className="console-arrow">&gt;</span> {log.message}
                      </div>
                    ))
                  ) : (
                    <div className="console-line muted">Awaiting log streams...</div>
                  )}
                </div>
              </div>

              {/* Vulnerabilities Findings Column */}
              <div className="card-light findings-card-light">
                <h3>Vulnerabilities Findings</h3>
                <p className="card-subtext-light">List of active exploits detected on the target site.</p>
                
                <div className="findings-stream-light">
                  {findings.length > 0 ? (
                    findings.map(finding => (
                      <div 
                        key={finding.id} 
                        className={`finding-item-card-light severity-${finding.severity.toLowerCase()}`}
                      >
                        <div className="finding-item-header">
                          <h4>{finding.title}</h4>
                          <span className={`badge-severity-light ${finding.severity.toLowerCase()}`}>
                            {finding.severity}
                          </span>
                        </div>
                        {finding.description && (
                          <p className="finding-item-desc">{finding.description}</p>
                        )}
                        <div className="finding-item-footer">
                          <span className="status-bullet"></span>
                          <span>{finding.status}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="findings-idle-placeholder">
                      <p>Scanning in progress. Vulnerability issues will appear here automatically.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
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
