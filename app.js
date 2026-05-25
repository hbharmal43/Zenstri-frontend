/* -------------------------------------------------------------
 * Zenstri Core Interactivity & Agent Simulator
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  
  // Element selections
  const btnShip = document.getElementById('btn-ship');
  const codeEditor = document.getElementById('code-editor');
  const insecureCode = document.getElementById('insecure-code');
  const secureCode = document.getElementById('secure-code');
  
  const terminalScreen = document.getElementById('terminal-screen');
  const agentStatusText = document.getElementById('agent-status-text');
  
  const founderModalOverlay = document.getElementById('founder-modal-overlay');
  const btnFixSecure = document.getElementById('btn-fix-secure');
  const btnBypassDanger = document.getElementById('btn-bypass-danger');
  
  const sandboxTextarea = document.getElementById('sandbox-textarea');
  const btnSandboxScan = document.getElementById('btn-sandbox-scan');
  const btnSandboxClear = document.getElementById('btn-sandbox-clear');
  const sandboxOutput = document.getElementById('sandbox-output');
  
  // Simulation State Variables
  let isSimulating = false;

  // Header floating shadow on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Helper: Append a row to the terminal with active animation
  function appendTerminalRow(text, type = 'info', delay = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const row = document.createElement('div');
        row.className = `terminal-row ${type}`;
        
        // Use custom cmd-prefix style for shell interactions
        if (type === 'cmd-prefix') {
          row.innerText = text;
        } else {
          row.innerText = `[${new Date().toLocaleTimeString()}] ${text}`;
        }
        
        terminalScreen.appendChild(row);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
        resolve();
      }, delay);
    });
  }

  // Helper: Clear terminal
  function clearTerminal() {
    terminalScreen.innerHTML = '';
  }

  // -------------------------------------------------------------
  // The Interactive Deployment Auditor Simulator
  // -------------------------------------------------------------
  async function runAuditorSimulation() {
    if (isSimulating) return;
    isSimulating = true;
    
    // Disable button, reset views
    btnShip.disabled = true;
    btnShip.style.opacity = '0.6';
    insecureCode.classList.remove('hidden');
    secureCode.classList.add('hidden');
    
    clearTerminal();
    agentStatusText.innerText = 'active';
    agentStatusText.parentElement.classList.add('active');
    
    // 1. Initial intercept sequence
    await appendTerminalRow('zenstri-agent --intercept --port 3000', 'cmd-prefix', 200);
    await appendTerminalRow('Zenstri Agent listening for deployment triggers...', 'info', 500);
    await appendTerminalRow('⚡ INTERCEPTED: Deployment request captured from Cursor/Lovable workflow.', 'highlight', 800);
    await appendTerminalRow('Intercept ID: ZST-4029 | Branch: main | Commit: vibe-code-alpha', 'info', 600);
    
    // 2. Code diagnostics audit
    await appendTerminalRow('🔍 Booting code parser and syntax AST analyzer...', 'info', 800);
    await appendTerminalRow('[TOOL] executing analyze_ast_structures("server.js")...', 'tool', 800);
    await appendTerminalRow('⚠️ WARNING: Raw string SQL interpolation found on Line 7!', 'highlight', 700);
    await appendTerminalRow('❌ CRITICAL: Stripe Secret API Key (sk_live_...) found committed plain on Line 13!', 'exploit', 600);
    
    // 3. Simulated attacks pen-test
    await appendTerminalRow('🔥 Launching isolated sandboxed exploitation simulation...', 'info', 900);
    await appendTerminalRow('[ATTACK SIM] Running Automated SQL Injection query tests...', 'tool', 700);
    await appendTerminalRow('[ATTACK SIM] Injecting payload: `email = \' OR \'1\'=\'1` to /api/users', 'tool', 600);
    await appendTerminalRow('💥 EXPLOIT SUCCESSFUL! Database yielded 120 client logs in plaintext.', 'exploit', 900);
    await appendTerminalRow('[ATTACK SIM] Simulating Stripe endpoint credential scraping...', 'tool', 500);
    await appendTerminalRow('💥 EXPLOIT SUCCESSFUL! Stripe private sk_live payload is active.', 'exploit', 800);
    
    // 4. Halt deployment and query founder intent
    await appendTerminalRow('🛑 Deployment pipeline BLOCKED. Syncing with founder intent...', 'exploit', 800);
    
    // Show the interactive Modal
    setTimeout(() => {
      founderModalOverlay.classList.remove('hidden');
    }, 1000);
  }

  // Trigger simulation click
  btnShip.addEventListener('click', runAuditorSimulation);

  // -------------------------------------------------------------
  // Founder Decision Outcomes
  // -------------------------------------------------------------
  
  // Path A: The Fix (Recommended)
  btnFixSecure.addEventListener('click', async () => {
    founderModalOverlay.classList.add('hidden');
    
    agentStatusText.innerText = 'auto-healing';
    
    await appendTerminalRow('Founder intent sync: APPLY AUTO-HEALING PR.', 'success', 200);
    await appendTerminalRow('🛠️ Refactoring database query inside server.js to use parameterized placeholders...', 'info', 600);
    await appendTerminalRow('🛠️ Abstracting hardcoded Stripe Private Key into process.env.STRIPE_SECRET_KEY...', 'info', 700);
    
    // Transition Editor Code
    insecureCode.classList.add('hidden');
    secureCode.classList.remove('hidden');
    
    await appendTerminalRow('[HEAL] Patch successfully applied. AST verification: clean.', 'success', 800);
    await appendTerminalRow('🤖 Running build integrity and compile verification checks...', 'info', 700);
    await appendTerminalRow('[TOOL] executing run_automated_tests() -> Compile Passed. Standard DB Mock query Passed.', 'tool', 900);
    await appendTerminalRow('📦 Generating Git Fix Pull Request: PR #12 ("Secured DB queries & Stripe extraction")...', 'info', 600);
    await appendTerminalRow('[SUCCESS] PR #12 approved and merged automatically into production.', 'success', 500);
    await appendTerminalRow('🚀 SECURE RELEASE SHIPPED TO VERCEL PRODUCTION!', 'success', 1000);
    
    agentStatusText.innerText = 'idle';
    btnShip.disabled = false;
    btnShip.style.opacity = '1';
    isSimulating = false;
  });

  // Path B: The Dangerous Bypass
  btnBypassDanger.addEventListener('click', async () => {
    founderModalOverlay.classList.add('hidden');
    
    agentStatusText.innerText = 'bypassed';
    
    await appendTerminalRow('Founder intent sync: OVERRIDE SAFEGUARDS AND BYPASS.', 'exploit', 200);
    await appendTerminalRow('⚠️ WARNING: Security locks released by administrative decree.', 'exploit', 600);
    await appendTerminalRow('⚠️ Vulnerable direct query left exposed on server.js:L7.', 'exploit', 500);
    await appendTerminalRow('⚠️ Plaintext private Stripe credential committed on server.js:L13.', 'exploit', 400);
    
    await appendTerminalRow('🚨 Dispatched security bypass audit report to Slack channel: #investor-panic.', 'highlight', 800);
    await appendTerminalRow('📦 Releasing unpatched vibe-coded app build to staging environments...', 'info', 800);
    await appendTerminalRow('🚀 Deployment pushed. Godspeed, founder.', 'exploit', 1000);
    
    agentStatusText.innerText = 'idle';
    btnShip.disabled = false;
    btnShip.style.opacity = '1';
    isSimulating = false;
  });

  // -------------------------------------------------------------
  // Paste-Your-Own Vibe Scanner Playground
  // -------------------------------------------------------------
  btnSandboxScan.addEventListener('click', () => {
    const code = sandboxTextarea.value.trim();
    
    if (!code) {
      sandboxOutput.innerHTML = `
        <div class="diagnostic-line warn">
          ⚠️ Context empty. Please type or paste some code before starting the scan.
        </div>
      `;
      return;
    }
    
    sandboxOutput.innerHTML = '<div class="terminal-row cmd-prefix">Analyzing code snippet...</div>';
    
    setTimeout(() => {
      let diagnosticLines = '';
      let issuesFound = 0;
      
      // SQL Injection checks
      const sqliPattern = /(\+|=)\s*['"`]\s*(\+)?\s*(req|query|body|input|user)/i;
      const sqlQueryKeyword = /(SELECT|INSERT|UPDATE|DELETE|DROP|FROM|WHERE)/i;
      
      if (sqliPattern.test(code) && sqlQueryKeyword.test(code)) {
        diagnosticLines += `
          <div class="diagnostic-line crit">
            <strong>[CRITICAL] Raw Query Interpolation Detected:</strong><br>
            Direct string addition found in SQL statement. This allows attackers to bypass login limits and read your entire database.<br>
            <em>Fix: Use parameterized bindings (e.g., db.query('SELECT * FROM users WHERE id = $1', [id])).</em>
          </div>
        `;
        issuesFound++;
      }
      
      // Exposed API keys / private tokens checks
      const keyPattern = /(sk_live|api_key|stripe_key|secret_key|private_key|token)\s*=\s*['"`]([A-Za-z0-9_]{10,})['"`]/i;
      if (keyPattern.test(code)) {
        diagnosticLines += `
          <div class="diagnostic-line crit">
            <strong>[CRITICAL] Hardcoded Private Credential Found:</strong><br>
            A high-risk private credential is declared directly in client script. If pushed to GitHub, bots will scrape and empty your stripe accounts in seconds.<br>
            <em>Fix: Store credentials in custom environment files and access using 'process.env'.</em>
          </div>
        `;
        issuesFound++;
      }
      
      // Dangerous Evaluation checks
      const evalPattern = /(eval|exec|child_process)\s*\(/i;
      if (evalPattern.test(code)) {
        diagnosticLines += `
          <div class="diagnostic-line crit">
            <strong>[CRITICAL] Dynamic Evaluation (eval/exec) Found:</strong><br>
            Dynamic instruction evaluation allows external shell execution. Attackers can execute custom terminal payloads directly on your hosting computer.<br>
            <em>Fix: Refactor logic to avoid executing raw text blocks as code lines.</em>
          </div>
        `;
        issuesFound++;
      }

      // Generic static injection / unsafe input interpolation check
      const interpolationPattern = /['"`]\s*\+\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*\+\s*['"`]/;
      if (interpolationPattern.test(code) && issuesFound === 0) {
        diagnosticLines += `
          <div class="diagnostic-line warn">
            <strong>[WARNING] Direct Query Interpolation:</strong><br>
            It looks like you are building queries or configs using string additions. While safe if isolated, this is a dangerous vibe-coding habit that leads to vulnerabilities.<br>
            <em>Fix: Leverage structured variables or parameter lists.</em>
          </div>
        `;
        issuesFound++;
      }
      
      // Perfect build return
      if (issuesFound === 0) {
        diagnosticLines += `
          <div class="diagnostic-line ok">
            <strong>[PASS] Clean Bill of Health:</strong><br>
            Zenstri checked the code. No direct raw SQL injections, eval scopes, or exposed credentials were found.<br>
            <em>Deployment status: Green to release!</em>
          </div>
        `;
      }
      
      sandboxOutput.innerHTML = `
        <div class="terminal-row success">[SCAN COMPLETED] Diagnostic logs generated.</div>
        ${diagnosticLines}
      `;
      
    }, 800);
  });
  
  // Clear Sandbox Textarea and Outputs
  btnSandboxClear.addEventListener('click', () => {
    sandboxTextarea.value = '';
    sandboxOutput.innerHTML = `
      <div class="result-placeholder">
        <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>Paste a snippet and click "Run Sandbox Scan" to see the agent parse and evaluate vulnerabilities.</p>
      </div>
    `;
  });
});
