'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const { user, signInWithGitHub, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async () => {
    setError('');
    setSubmitting(true);
    try {
      await signInWithGitHub();
    } catch (e: any) {
      setError(e.message || 'Authentication failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="split-auth-container">
        <div className="auth-loading-screen">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading secure session...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="split-auth-container">
      {/* Left side: Premium Branding Column */}
      <div className="auth-brand-side">
        <div className="auth-brand-bg-pattern"></div>
        <div className="auth-brand-content">
          <div className="brand-logo-row">
            <img className="logo-svg" src="/assets/logo.svg" alt="Zenstri Logo" />
            <span className="logo-text">Zenstri</span>
          </div>
          
          <h1 className="brand-heading">Security for the vibe-coded era.</h1>
          <p className="brand-subtext">Zenstri audits AI-built apps across code, browser, and infrastructure, then opens verified fix PRs automatically.</p>
          
          <div className="brand-bullets">
            <div className="brand-bullet-item">
              <span className="bullet-check">✓</span>
              <span><strong>Active Protection</strong>: Secured before it ships</span>
            </div>
            <div className="brand-bullet-item">
              <span className="bullet-check">✓</span>
              <span><strong>Auto-Fix Commits</strong>: Parameterize queries & relocate keys</span>
            </div>
            <div className="brand-bullet-item">
              <span className="bullet-check">✓</span>
              <span><strong>Explicit Consent Gate</strong>: Realtime non-destructive exploits</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side: Clean white form side */}
      <div className="auth-form-side">
        <div className="auth-form-content">
          <div className="mobile-only-logo">
            <img className="logo-svg" src="/assets/logo.svg" alt="Zenstri Logo" />
            <span className="logo-text">Zenstri</span>
          </div>

          <h2>Welcome back</h2>
          <p className="form-subtitle">Connect your account to access your workspace dashboard.</p>
          
          <button 
            className="btn-auth-github" 
            onClick={handleLogin}
            disabled={submitting}
          >
            <svg className="bullet-icon-github" style={{ marginRight: 8, width: 20, height: 20 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            {submitting ? 'Connecting...' : 'Sign in with GitHub'}
          </button>
          
          {error && <p className="dashboard-error">{error}</p>}
          
          <div className="form-footer-nav">
            <span>New to Zenstri? </span>
            <Link href="/signup" className="highlight-orange">Create a free account</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
