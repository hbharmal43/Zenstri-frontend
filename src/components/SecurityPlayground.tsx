'use client';

import { useState } from 'react';

export default function SecurityPlayground() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    if (!code.trim()) return;
    setScanning(true);
    setResult('Analyzing snippet...');
    
    setTimeout(() => {
      if (code.includes('sk_live_') || code.includes('AIzaSy')) {
        setResult('🚨 CRITICAL VULNERABILITY FOUND: Hardcoded private credentials exposed.');
      } else if (code.includes('+') && code.includes('SELECT')) {
        setResult('🚨 HIGH RISK VULNERABILITY: Raw SQL string concatenation detected.');
      } else {
        setResult('✅ SCAN COMPLETED: No immediate critical vulnerabilities found.');
      }
      setScanning(false);
    }, 1200);
  };

  const handleClear = () => {
    setCode('');
    setResult(null);
  };

  return (
    <section id="sandbox" className="sandbox-section">
      <div className="container glass-panel complex-glass">
        <div className="sandbox-header">
          <div className="sandbox-logo-mark">
            <svg className="sandbox-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <h3>Zenstri Security Playground</h3>
          </div>
          <span className="sandbox-status">Online Diagnostic Console</span>
        </div>
        
        <div className="sandbox-body-grid">
          <div className="sandbox-editor-wrapper">
            <label htmlFor="sandbox-textarea" className="sandbox-label">Paste a code snippet (e.g. database query, API key, auth check):</label>
            <textarea 
              id="sandbox-textarea" 
              className="sandbox-textarea" 
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder={`// Paste some unsafe code to see the agent run...
const query = 'SELECT * FROM users WHERE id = ' + req.body.id;
const stripeKey = 'sk_live_5129840294829';`}
            ></textarea>
            
            <div className="sandbox-actions">
              <button className="btn btn-primary" id="btn-sandbox-scan" onClick={handleScan} disabled={scanning}>
                {scanning ? 'Scanning...' : 'Run Sandbox Scan'}
              </button>
              <button className="btn btn-outline" id="btn-sandbox-clear" onClick={handleClear}>
                Clear Code
              </button>
            </div>
          </div>
          
          <div className="sandbox-result-wrapper">
            <h4 className="sandbox-label">Agent Output Diagnostic:</h4>
            <div className="sandbox-result-display" id="sandbox-output">
              {result === null ? (
                <div className="result-placeholder">
                  <svg className="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p>Paste a snippet and click "Run Sandbox Scan" to see the agent parse and evaluate vulnerabilities.</p>
                </div>
              ) : (
                <div className={`scan-result ${result.includes('🚨') ? 'vulnerable' : 'safe'}`}>
                  {result}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
