import { ApiClient } from './api.js';
import { subscribeToAuditStreams } from './firestore.js';
import {
  renderAudit,
  renderConsentModal,
  renderError,
  renderFindings,
  renderLogs
} from './render.js';

export class DashboardController {
  constructor({
    dom,
    api = new ApiClient(),
    subscribeToAuditStreamsImpl = subscribeToAuditStreams
  }) {
    this.dom = dom;
    this.api = api;
    this.subscribeToAuditStreams = subscribeToAuditStreamsImpl;
    this.currentProject = null;
    this.unsubscribeAudit = null;
  }

  start() {
    this.dom.projectForm?.addEventListener('submit', (event) => this.createProject(event));
    this.dom.runAuditButton?.addEventListener('click', () => this.requestAudit());
    this.dom.connectGitHubButton?.addEventListener('click', () => this.openGitHubInstall());
    this.dom.consentCheckbox?.addEventListener('change', () => {
      this.dom.consentConfirmButton.disabled = !this.dom.consentCheckbox.checked;
    });
    this.dom.consentConfirmButton?.addEventListener('click', () => this.confirmConsentAndRun());
  }

  async createProject(event) {
    event.preventDefault();
    renderError(this.dom, '');

    try {
      this.currentProject = await this.api.createProject({
        repoFullName: this.dom.repoInput.value.trim(),
        liveUrl: this.dom.liveUrlInput.value.trim()
      });
      this.dom.runAuditButton.disabled = false;

      if (this.currentProject.lastAuditId) {
        this.subscribeToAudit(this.currentProject.lastAuditId);
      }
    } catch (error) {
      renderError(this.dom, error.message);
    }
  }

  async requestAudit() {
    if (!this.currentProject) {
      renderError(this.dom, 'Save a project before running an audit.');
      return;
    }

    if (!this.currentProject.consentCurrent) {
      renderConsentModal(this.dom, true);
      return;
    }

    await this.createAudit();
  }

  async confirmConsentAndRun() {
    renderError(this.dom, '');

    try {
      await this.api.createConsent(this.currentProject.id);
      this.currentProject = { ...this.currentProject, consentCurrent: true };
      renderConsentModal(this.dom, false);
      await this.createAudit();
    } catch (error) {
      renderError(this.dom, error.message);
    }
  }

  async createAudit() {
    renderError(this.dom, '');
    this.dom.runAuditButton.disabled = true;

    try {
      const audit = await this.api.createAudit(this.currentProject.id);
      renderAudit(this.dom, audit);
      this.subscribeToAudit(audit.id);
    } catch (error) {
      renderError(this.dom, error.message);
    } finally {
      this.dom.runAuditButton.disabled = false;
    }
  }

  subscribeToAudit(auditId) {
    this.unsubscribeAudit?.();
    this.unsubscribeAudit = this.subscribeToAuditStreams({
      auditId,
      onAudit: (audit) => renderAudit(this.dom, audit),
      onLogs: (logs) => renderLogs(this.dom, logs),
      onFindings: (findings) => renderFindings(this.dom, findings),
      onError: (error) => renderError(this.dom, error.message)
    });
  }

  async openGitHubInstall() {
    renderError(this.dom, '');

    try {
      const response = await this.api.getGitHubInstallUrl();
      window.location.href = response.installUrl;
    } catch (error) {
      renderError(this.dom, error.message);
    }
  }
}
