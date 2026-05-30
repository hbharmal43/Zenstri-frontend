'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import InteractiveDemo from '@/components/InteractiveDemo';
import SecurityPlayground from '@/components/SecurityPlayground';

export default function Home() {
  const { user, signInWithGitHub } = useAuth();

  return (
    <main>
      {/* Organic Nature Hero Section */}
      <section className="hero-section">
        <div className="hero-backdrop" style={{ backgroundImage: "url('/hero.jpg')" }}></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-container container">
          {/* Left Column: Copy & Actions */}
          <div className="hero-left animate-fade-in">
            <div className="hero-caption">INTRODUCING ZENSTRI</div>
            
            <h1 className="hero-heading">Security for the <br /><span className="highlight-orange" style={{ whiteSpace: "nowrap" }}>vibe-coded&nbsp;era.</span></h1>
            
            <p className="hero-subtext">
              Zenstri audits AI-built apps across code, browser, and infrastructure, then opens verified fix PRs for the issues it can patch safely.
            </p>
            
            <div className="hero-buttons">
              {user ? (
                <Link href="/dashboard" className="btn btn-primary animate-pulse-glow">
                  <svg className="bullet-icon" style={{ marginTop: 0, width: 18, height: 18, color: "currentColor" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Go to Dashboard Workspace
                </Link>
              ) : (
                <button className="btn btn-primary" onClick={() => signInWithGitHub()}>
                  <svg className="bullet-icon" style={{ marginTop: 0, width: 18, height: 18, color: "currentColor" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  Connect with GitHub
                </button>
              )}
              <a href="#simulator" className="btn btn-outline hero-outline">
                <svg className="bullet-icon" style={{ marginTop: 0, width: 18, height: 18, color: "currentColor" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Watch Simulator
              </a>
            </div>
            
            {/* Horizontal Features Bullet Row */}
            <div className="hero-features-row">
              <div className="feature-bullet">
                <svg className="bullet-icon green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div>
                  <strong>Active Protection</strong>
                  <span>Always On</span>
                </div>
              </div>
              <div className="feature-bullet">
                <svg className="bullet-icon green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <div>
                  <strong>Auto-Fix Commits</strong>
                  <span>Before Deploy</span>
                </div>
              </div>
              <div className="feature-bullet">
                <svg className="bullet-icon green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <div>
                  <strong>Zero Secrets Exposed</strong>
                  <span>Privacy First</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dashboard Mockup */}
          <div className="hero-right animate-fade-in">
            <div className="dashboard-mockup">
              {/* Sidebar */}
              <div className="dash-sidebar">
                <div className="dash-brand">
                  <img className="dash-logo-svg" src="/assets/logo.svg" alt="Zenstri Logo" />
                  <span>Zenstri</span>
                </div>
                
                <nav className="dash-nav">
                  <a href="#simulator" className="dash-nav-item active">
                    <svg className="dash-nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span className="dash-label">Intercepts</span>
                    <span className="dash-badge">12</span>
                  </a>
                  <a href="#simulator" className="dash-nav-item">
                    <svg className="dash-nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span className="dash-label">Scan Results</span>
                  </a>
                  <a href="#simulator" className="dash-nav-item">
                    <svg className="dash-nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span className="dash-label">Auto-Fixes</span>
                  </a>
                  <a href="#simulator" className="dash-nav-item">
                    <svg className="dash-nav-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="6" y1="3" x2="6" y2="15" />
                      <circle cx="18" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <path d="M18 9a9 9 0 0 1-9 9" />
                    </svg>
                    <span className="dash-label">Commits</span>
                  </a>
                </nav>
              </div>
              
              {/* Main Content */}
              <div className="dash-main">
                {/* Top Header Bar */}
                <div className="dash-header-bar">
                  <div>
                    <h4 className="dash-title">Latest Intercept</h4>
                    <span className="dash-meta">just now</span>
                  </div>
                  <div className="dash-status-badge">
                    <span className="dash-status-dot green"></span>
                    <span>Protected</span>
                    <span className="dash-status-sub">Ready to Deploy</span>
                  </div>
                </div>
                
                {/* Intercept Card */}
                <div className="dash-intercept-row">
                  <div className="dash-intercept-source">
                    <span className="source-dot lovable"></span>
                    <span>Lovable</span>
                  </div>
                  <span className="dash-arrow">→</span>
                  <div className="dash-intercept-repo">
                    <span className="source-dot repo"></span>
                    <span>zenstri/secure-app</span>
                  </div>
                  <span className="dash-state-badge">Intercepted</span>
                </div>
                
                {/* Stats Rows */}
                <div className="dash-stats-grid">
                  <div className="stat-card">
                    <span className="stat-num orange">12</span>
                    <span className="stat-label">Issues Found</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num orange">8</span>
                    <span className="stat-label">Auto-Fixed</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num green">0</span>
                    <span className="stat-label">Critical</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num green">✓ Passed</span>
                    <span className="stat-label">Security Gate</span>
                  </div>
                </div>
                
                {/* Issues List */}
                <div className="dash-issues-section">
                  <h5 className="issues-title">Top Issues Detected</h5>
                  
                  <div className="dash-issue-item">
                    <div className="issue-name-col">
                      <span className="issue-icon red">▲</span>
                      <span>Hardcoded API Key</span>
                    </div>
                    <span className="severity-tag critical">Critical</span>
                    <span className="status-tag fixed">Auto-Fixed ✓</span>
                  </div>
                  
                  <div className="dash-issue-item">
                    <div className="issue-name-col">
                      <span className="issue-icon orange">▲</span>
                      <span>SQL Injection Risk</span>
                    </div>
                    <span className="severity-tag high">High</span>
                    <span className="status-tag fixed">Auto-Fixed ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Center Secure Tagline */}
        <div className="hero-bottom-tagline">
          <span>🛡️</span> Every build. Every time. Secured before it ships.
        </div>
      </section>

      {/* Supported Tools Banner */}
      <section className="integrations-bar">
        <p className="integrations-title">Sits in front of the tools you vibe-code with:</p>
        <div className="logo-grid">
          <div className="logo-item"><span className="logo-dot orange"></span> Lovable</div>
          <div className="logo-item"><span className="logo-dot dark"></span> Cursor</div>
          <div className="logo-item"><span className="logo-dot orange"></span> v0 by Vercel</div>
          <div className="logo-item"><span className="logo-dot dark"></span> Bolt.new</div>
          <div className="logo-item"><span className="logo-dot orange"></span> Replit</div>
        </div>
      </section>

      {/* Main Interactive Simulator (Showpiece) */}
      <InteractiveDemo />

      {/* How Zenstri Audits Section */}
      <section id="how-it-works" className="features-section">
        <div className="container">
          <div className="section-header align-center">
            <h2 className="section-title">The Multi-Step Agentic Shield</h2>
            <p className="section-subtitle">Vibe-coding requires proactive security. Static linters catch style issues; Zenstri runs a full security engineering cycle autonomously in milliseconds.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-panel hover-glow">
              <div className="feature-index">01</div>
              <h3 className="feature-title">CI/CD & Git Interception</h3>
              <p className="feature-text">
                Integrates directly as a webhook inside your Lovable, Cursor, Bolt, or GitHub environment. Before code hits the deployment server, Zenstri intercepts the pipeline securely.
              </p>
            </div>

            <div className="feature-card glass-panel hover-glow">
              <div className="feature-index">02</div>
              <h3 className="feature-title">Sandboxed Exploits</h3>
              <p className="feature-text">
                We don't just guess. Zenstri spins up an isolated sandbox environment, boots your web server, and actively runs vulnerability exploits (SQLi, CSRF, key scraping, IDOR bypasses) using custom testing models.
              </p>
            </div>

            <div className="feature-card glass-panel hover-glow">
              <div className="feature-index">03</div>
              <h3 className="feature-title">Founder Intent Sync</h3>
              <p className="feature-text">
                Instead of throwing cryptic error lists at you, Zenstri chats with you. It posts a clean prompt on Slack, Discord, or web modal: <em>"I noticed this endpoint exposes emails. Is this supposed to require authentication?"</em>
              </p>
            </div>

            <div className="feature-card glass-panel hover-glow">
              <div className="feature-index">04</div>
              <h3 className="feature-title">Autonomic Healing PRs</h3>
              <p className="feature-text">
                Once you confirm your intent, the agent writes the solution code, spins up unit tests to verify compile safety, commits a structural fix PR, merges it, and deploys. Zero downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Paste Your Vibe Sandbox Scanner Playground */}
      <SecurityPlayground />

      {/* VC Panic & Testimonials */}
      <section className="testimonials-section">
        <div className="container align-center">
          <h2 className="section-title">"Vibe-Coding is awesome... until it isn't."</h2>
          <p className="section-subtitle">Founders are moving 100x faster, but shipping standard developer oversights. Here is what industry insiders say:</p>
          
          <div className="testimonials-grid">
            <div className="testimonial-card glass-panel">
              <p className="quote">"Our non-technical co-founder built an entire SaaS CRM in 3 days. It was amazing, but they left our Postgres database port open to the wild with credentials committed in Git. Zenstri caught it in Lovable before launch."</p>
              <div className="author-info">
                <span className="author-avatar orange">JM</span>
                <div>
                  <strong className="author-name">Jason M.</strong>
                  <span className="author-title">Co-Founder, SaaS Automation</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card glass-panel">
              <p className="quote">"Every VC's portfolio dashboard is a potential compliance nightmare under vibe-coding. Zenstri gives technical guidance to non-technical teams, keeping their apps secure and their investors relaxed."</p>
              <div className="author-info">
                <span className="author-avatar dark">SH</span>
                <div>
                  <strong className="author-name">Sarah H.</strong>
                  <span className="author-title">Managing Partner, Pre-Seed Capital</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="cta-section">
        <div className="cta-container glass-panel">
          <h2 className="cta-heading">Protect your vibe-coded builds.</h2>
          <p className="cta-subtext">Sign in with GitHub, connect one demo repo, authorize non-destructive probes, and watch the audit stream live.</p>
          <div className="cta-buttons">
            <a href="#simulator" className="btn btn-primary">Try Active Simulator</a>
            {user ? (
              <Link href="/dashboard" className="btn btn-outline">Go to Workspace</Link>
            ) : (
              <button className="btn btn-outline" onClick={() => signInWithGitHub()}>Connect with GitHub</button>
            )}
          </div>
        </div>
      </section>

      {/* Clean Minimal Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-brand">
            <div className="logo">
              <img className="logo-svg" src="/assets/logo.svg" alt="Zenstri Logo" />
              <span className="logo-text">Zenstri</span>
            </div>
            <p className="footer-tagline">Security agents for high-speed, vibe-coded software systems.</p>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#simulator">Live Interceptor</a>
              <a href="#how-it-works">Exploit Engine</a>
              <a href="#sandbox">Diagnostic Sandbox</a>
            </div>
            <div className="footer-column">
              <h4>Ecosystem</h4>
              <a href="#">Lovable Plugin</a>
              <a href="#">Cursor Extension</a>
              <a href="#">Bolt Sync</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Zenstri Inc. All rights reserved. Shipped securely by YC W26.</p>
        </div>
      </footer>
    </main>
  );
}
