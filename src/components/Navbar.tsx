'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Hide navbar on non-homepage routes (login, signup, dashboard)
  if (pathname !== '/') return null;

  return (
    <header className="glass-header" id="navbar">
      <div className="header-container">
        <Link href="/" className="logo">
          <img className="logo-svg" src="/assets/logo.svg" alt="Zenstri Logo" />
          <span className="logo-text">Zenstri</span>
        </Link>
        
        <nav className={`nav-links ${mobileOpen ? 'active' : ''}`}>
          <a href="/#how-it-works" className="nav-link" onClick={() => setMobileOpen(false)}>How it Works</a>
          <a href="/#simulator" className="nav-link" onClick={() => setMobileOpen(false)}>Live Demo</a>
          <a href="/#sandbox" className="nav-link" onClick={() => setMobileOpen(false)}>Scan Sandbox</a>
          {user && (
            <Link href="/dashboard" className="nav-link" onClick={() => setMobileOpen(false)}>
              Workspace
            </Link>
          )}
        </nav>
        
        <div className="header-actions">
          {user ? (
            <button className="cta-button primary-cta small" onClick={() => signOut()}>Sign Out</button>
          ) : (
            <Link href="/login" className="cta-button primary-cta small">Get Started</Link>
          )}
        </div>
        
        <button 
          className={`mobile-nav-toggle ${mobileOpen ? 'active' : ''}`} 
          onClick={() => setMobileOpen(!mobileOpen)} 
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
