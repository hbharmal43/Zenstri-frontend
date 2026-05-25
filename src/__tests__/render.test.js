import { beforeEach, describe, expect, it } from 'vitest';
import { getDom } from '../dom.js';
import { renderAuthState, renderAudit, renderFindings, renderLogs } from '../render.js';

beforeEach(() => {
  document.body.innerHTML = `
    <button data-auth-sign-in></button>
    <button data-auth-sign-out hidden></button>
    <section data-dashboard hidden></section>
    <span data-user-name></span>
    <span data-audit-status></span>
    <div data-log-list></div>
    <div data-finding-list></div>
  `;
});

describe('renderAuthState', () => {
  it('shows dashboard and user profile when signed in', () => {
    const dom = getDom(document);

    renderAuthState(dom, { displayName: 'Ada', email: 'ada@example.com' });

    expect(dom.dashboard.hidden).toBe(false);
    expect(dom.signInButton.hidden).toBe(true);
    expect(dom.signOutButton.hidden).toBe(false);
    expect(dom.userName.textContent).toBe('Ada');
  });
});

describe('renderAudit', () => {
  it('renders audit status text', () => {
    const dom = getDom(document);

    renderAudit(dom, { status: 'running', summary: 'Scanning code and live site.' });

    expect(dom.auditStatus.textContent).toContain('running');
    expect(dom.auditStatus.textContent).toContain('Scanning code and live site.');
  });
});

describe('renderLogs', () => {
  it('renders agent log messages', () => {
    const dom = getDom(document);

    renderLogs(dom, [
      { id: '1', agentName: 'Static Agent', message: 'Scanning repo.', level: 'info' }
    ]);

    expect(dom.logList.textContent).toContain('Static Agent');
    expect(dom.logList.textContent).toContain('Scanning repo.');
  });
});

describe('renderFindings', () => {
  it('renders finding severity, proof, and PR link', () => {
    const dom = getDom(document);

    renderFindings(dom, [
      {
        id: 'finding-1',
        severity: 'critical',
        title: 'Hardcoded Stripe key',
        proof: 'sk_live value found in bundle.',
        patchPrUrl: 'https://github.com/demo/app/pull/1'
      }
    ]);

    expect(dom.findingList.textContent).toContain('critical');
    expect(dom.findingList.textContent).toContain('Hardcoded Stripe key');
    expect(dom.findingList.querySelector('a').href).toBe('https://github.com/demo/app/pull/1');
  });
});
