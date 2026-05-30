'use client';

import { useState } from 'react';

interface ConsentModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConsentModal({ onConfirm, onCancel }: ConsentModalProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="consent-modal" role="dialog" aria-modal="true" aria-labelledby="consent-title" style={{ display: 'flex' }}>
      <div className="consent-modal__panel">
        <h2 id="consent-title">Authorize live-site probes</h2>
        <p>Zenstri will simulate non-destructive hostile traffic against URLs you own, including header checks, CORS probes, source-map checks, browser console inspection, and a short rate-limit probe.</p>
        <label className="consent-check">
          <input 
            type="checkbox" 
            checked={checked} 
            onChange={(e) => setChecked(e.target.checked)} 
          />
          I authorize Zenstri to run these non-destructive checks against this project.
        </label>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button 
            className="btn btn-primary" 
            type="button" 
            onClick={onConfirm} 
            disabled={!checked}
          >
            Continue audit
          </button>
          <button 
            className="btn btn-outline" 
            type="button" 
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
