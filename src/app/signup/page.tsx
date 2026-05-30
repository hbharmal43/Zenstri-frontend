'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const { user, signInWithGitHub, loading } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSignup = async () => {
    setError('');
    setSubmitting(true);
    try {
      await signInWithGitHub();
    } catch (e: any) {
      setError(e.message || 'Signup failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="auth-page-container">
        <div className="glass-panel complex-glass auth-box align-center">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading secure session...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page-container">
      <div className="hero-backdrop" style={{ backgroundImage: "url('/hero.jpg')" }}></div>
      <div className="hero-overlay"></div>
      
      <div className="glass-panel complex-glass auth-box animate-fade-in">
        <div className="auth-logo-row">
          <img className="logo-svg" src="/assets/logo.svg" alt="Zenstri Logo" />
          <span className="logo-text">Zenstri</span>
        </div>
        
        <h2>Create your account</h2>
        <p className="auth-subtitle">Join Zenstri to secure your vibe-coded systems. Create a free developer account in seconds.</p>
        
        <button 
          className="btn btn-primary btn-auth" 
          onClick={handleSignup}
          disabled={submitting}
        >
          <svg className="bullet-icon" style={{ marginTop: 0, width: 20, height: 20, color: "currentColor" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          {submitting ? 'Setting up...' : 'Sign up with GitHub'}
        </button>
        
        {error && <p className="dashboard-error">{error}</p>}
        
        <div className="auth-footer">
          <span>Already have an account? </span>
          <Link href="/login" className="highlight-orange">Sign in</Link>
        </div>
      </div>
    </main>
  );
}
