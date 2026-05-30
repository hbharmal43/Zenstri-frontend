'use client';

import { useState } from 'react';

export default function InteractiveDemo() {
  const [hasShipped, setHasShipped] = useState(false);
  const [agentStatus, setAgentStatus] = useState('idle');
  const [logs, setLogs] = useState<string[]>([
    'awaiting deployment intercept...',
    'Press the "Ship Live Deploy" button in your Lovable environment.'
  ]);
  const [showModal, setShowModal] = useState(false);

  const startSimulation = () => {
    if (hasShipped) return;
    setHasShipped(true);
    setAgentStatus('scanning');
    setLogs([
      '[Agent] Deploy intercepted from Lovable pipeline...',
      '[Agent] Spinning up secure sandbox container...',
      '[Agent] Simulating active exploit payloads...',
      '[Agent] ⚠️ Security scan alert! Critical vulnerabilities identified.'
    ]);
    
    setTimeout(() => {
      setShowModal(true);
    }, 1200);
  };

  const handleFix = () => {
    setShowModal(false);
    setAgentStatus('healing');
    setLogs(prev => [
      ...prev,
      '[Agent] Parameterizing raw database queries...',
      '[Agent] Abstracting secrets to process.env variables...',
      '[Agent] Running verification tests inside sandbox... PASS',
      '[Agent] 🚀 Secure fix committed and Pull Request opened successfully!'
    ]);
  };

  const handleBypass = () => {
    setShowModal(false);
    setAgentStatus('bypassed');
    setLogs(prev => [
      ...prev,
      '[Agent] ⚠️ WARNING: Deploying insecure vibe-coded modules...',
      '[Agent] Raw deployment bypass recorded.',
      '[Agent] Application deployed live.'
    ]);
  };

  return (
    <section id="simulator" className="simulator-section">
      <div className="section-header animate-scroll">
        <h2 className="section-title">Experience the Interceptor</h2>
        <p className="section-subtitle">Watch Zenstri capture a vulnerable vibe-coded deploy, run active exploit simulations, ask critical questions, and commit a secure fix.</p>
      </div>

      <div className="simulator-grid container animate-scroll">
        {/* Left: Code Editor Window */}
        <div className="simulator-pane code-pane glass-panel">
          <div className="pane-header">
            <div className="window-controls">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="pane-title">server.js</div>
            <div className="pane-action">
              <button className="ship-button" id="btn-ship" onClick={startSimulation} disabled={hasShipped}>
                <svg className="rocket-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5s1 4.24 2.5 5.5"/>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <span>Ship Live Deploy</span>
              </button>
            </div>
          </div>
          
          <div className="code-viewport" id="code-editor">
            {!hasShipped ? (
              <pre className="code-block" id="insecure-code"><code>
<span className="line-num">1</span><span className="token keyword">const</span> express = <span className="token function">require</span>(<span className="token string">'express'</span>);
<span className="line-num">2</span><span className="token keyword">const</span> app = <span className="token function">express</span>();
<span className="line-num">3</span><span className="token keyword">const</span> pg = <span className="token function">require</span>(<span className="token string">'pg'</span>);
<span className="line-num">4</span>
<span className="line-num">5</span><span className="token comment">// Vibe-Coded API Endpoint - Vulnerable to SQLi</span>
<span className="line-num">6</span>app.<span className="token method">get</span>(<span className="token string">'/api/users'</span>, <span className="token keyword">async</span> (req, res) =&gt; {'{'}
<span className="line-num">7</span>  <span className="token keyword">const</span> query = <span className="token string">`SELECT * FROM accounts WHERE email = '${'$'}{'{req.query.email}'}'`</span>;
<span className="line-num">8</span>  <span className="token keyword">const</span> result = <span className="token keyword">await</span> db.<span className="token function">query</span>(query);
<span className="line-num">9</span>  res.<span className="token function">json</span>(result.rows);
<span className="line-num">10</span>{'}'});
<span className="line-num">11</span>
<span className="line-num">12</span><span className="token comment">// Stripe webhook handling - hardcoded secret</span>
<span className="line-num">13</span><span className="token keyword">const</span> STRIPE_KEY = <span className="token string">'sk_live_51Ny8Y2BvXpQ7R3z...fakeKey'</span>;
<span className="line-num">14</span>
<span className="line-num">15</span>app.<span className="token method">listen</span>(<span className="token number">3000</span>, () =&gt; console.<span className="token function">log</span>(<span className="token string">'App shipped!'</span>));
              </code></pre>
            ) : (
              <pre className="code-block" id="secure-code"><code>
<span className="line-num">1</span><span className="token keyword">const</span> express = <span className="token function">require</span>(<span className="token string">'express'</span>);
<span className="line-num">2</span><span className="token keyword">const</span> app = <span className="token function">express</span>();
<span className="line-num">3</span><span className="token keyword">const</span> pg = <span className="token function">require</span>(<span className="token string">'pg'</span>);
<span className="line-num">4</span>
<span className="line-num">5</span><span className="token comment">// Secure Audited API Endpoint - Parameterized Query</span>
<span className="line-num">6</span>app.<span className="token method">get</span>(<span className="token string">'/api/users'</span>, <span className="token keyword">async</span> (req, res) =&gt; {'{'}
<span className="line-num">7</span><span className="diff-del">-  const query = `SELECT * FROM accounts WHERE email = '${'$'}{'{req.query.email}'}'`;</span>
<span className="line-num">8</span><span className="diff-add">+  const query = \'SELECT * FROM accounts WHERE email = $1\';</span>
<span className="line-num">9</span><span className="diff-del">-  const result = await db.query(query);</span>
<span className="line-num">10</span><span className="diff-add">+  const result = await db.query(query, [req.query?.email]);</span>
<span className="line-num">11</span>  res.<span className="token function">json</span>(result.rows);
<span className="line-num">12</span>{'}'});
<span className="line-num">13</span>
<span className="line-num">14</span><span className="token comment">// Environment Variable Relocation Applied</span>
<span className="line-num">15</span><span className="diff-del">-const STRIPE_KEY = \'sk_live_51Ny8Y2BvXpQ7R3z...fakeKey\';</span>
<span className="line-num">16</span><span className="diff-add">+const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;</span>
<span className="line-num">17</span>
<span className="line-num">18</span>app.<span className="token method">listen</span>(<span className="token number">3000</span>, () =&gt; console.<span className="token function">log</span>(<span className="token string">'App shipped safely!'</span>));
              </code></pre>
            )}
          </div>
        </div>

        {/* Right: Zenstri Agent Console */}
        <div className="simulator-pane terminal-pane glass-panel dark">
          <div className="pane-header">
            <div className="window-controls">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="pane-title">zenstri-agent --intercept</div>
            <div className="status-indicator">
              <span className="indicator-pulse"></span>
              <span id="agent-status-text">{agentStatus}</span>
            </div>
          </div>
          
          <div className="terminal-viewport" id="terminal-screen">
            {logs.map((log, idx) => (
              <div 
                key={idx} 
                className={`terminal-row ${idx === 0 && !hasShipped ? 'cmd-prefix' : ''} ${log.includes('⚠️') || log.includes('🚨') ? 'red' : log.includes('🚀') || log.includes('PASS') ? 'green' : ''}`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Human in the loop Interactive Decision Modal */}
      {showModal && (
        <div className="modal-overlay" id="founder-modal-overlay">
          <div className="founder-modal glass-modal">
            <div className="modal-header">
              <div className="modal-badge">
                <svg className="warning-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>Zenstri Founder Intent Sync</span>
              </div>
              <div className="modal-meta">Intercept ID: <strong>ZST-4029</strong></div>
            </div>
            
            <div className="modal-body">
              <p className="modal-question">
                "Hey founder, I intercepted a deployment from Lovable. You've got customer emails accessible via an unparameterized SQL route, and a live Stripe Private Key hardcoded directly in server.js. Should I automatically parameterize queries, extract the secret key into environment configurations, and write a patch PR?"
              </p>
              
              <div className="vulnerabilities-list">
                <div className="vuln-item">
                  <span className="vuln-severity critical">CRITICAL</span>
                  <span className="vuln-desc">SQL Injection on <code>GET /api/users</code> allows arbitrary db read/write.</span>
                </div>
                <div className="vuln-item">
                  <span className="vuln-severity high">HIGH</span>
                  <span className="vuln-desc">Exposed Stripe Private Key (<code>sk_live_...</code>) committed directly.</span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="modal-btn btn-confirm" id="btn-fix-secure" onClick={handleFix}>
                <span className="btn-icon">✨</span>
                <div className="btn-text">
                  <strong>Apply Auto-Fix & Commit Securely</strong>
                  <span className="btn-sub">Parameterize query & abstract keys (Recommended)</span>
                </div>
              </button>
              
              <button className="modal-btn btn-cancel" id="btn-bypass-danger" onClick={handleBypass}>
                <span className="btn-icon">⚠️</span>
                <div className="btn-text">
                  <strong>Bypass and Deploy Raw Vibe</strong>
                  <span className="btn-sub">Ship vulnerable code (Not recommended)</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
