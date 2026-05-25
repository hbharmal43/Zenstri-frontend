import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DashboardController } from '../dashboard.js';
import { getDom } from '../dom.js';

beforeEach(() => {
  document.body.innerHTML = `
    <button data-auth-sign-in></button>
    <button data-auth-sign-out hidden></button>
    <section data-dashboard hidden></section>
    <span data-user-name></span>
    <form data-project-form>
      <input data-repo-input>
      <input data-live-url-input>
      <button data-run-audit type="button" disabled></button>
      <button data-connect-github type="button"></button>
    </form>
    <span data-audit-status></span>
    <div data-log-list></div>
    <div data-finding-list></div>
    <div data-consent-modal hidden>
      <input data-consent-checkbox type="checkbox">
      <button data-consent-confirm disabled></button>
    </div>
    <p data-error-box hidden></p>
  `;
});

describe('DashboardController', () => {
  it('creates a project and enables audit button', async () => {
    const api = {
      createProject: vi.fn().mockResolvedValue({
        id: 'project-1',
        consentCurrent: true,
        lastAuditId: null
      })
    };
    const controller = new DashboardController({
      dom: getDom(document),
      api,
      subscribeToAuditStreamsImpl: vi.fn()
    });
    controller.start();

    document.querySelector('[data-repo-input]').value = 'demo/app';
    document.querySelector('[data-live-url-input]').value = 'https://demo.example';
    document.querySelector('[data-project-form]').dispatchEvent(new Event('submit'));
    await Promise.resolve();

    expect(api.createProject).toHaveBeenCalledWith({
      repoFullName: 'demo/app',
      liveUrl: 'https://demo.example'
    });
    expect(document.querySelector('[data-run-audit]').disabled).toBe(false);
  });

  it('requires consent before first audit', async () => {
    const api = {
      createAudit: vi.fn(),
      createConsent: vi.fn().mockResolvedValue({ consentCurrent: true })
    };
    const dom = getDom(document);
    const controller = new DashboardController({
      dom,
      api,
      subscribeToAuditStreamsImpl: vi.fn()
    });
    controller.currentProject = { id: 'project-1', consentCurrent: false };
    controller.start();

    dom.runAuditButton.disabled = false;
    dom.runAuditButton.click();

    expect(dom.consentModal.hidden).toBe(false);
    expect(api.createAudit).not.toHaveBeenCalled();
  });
});
