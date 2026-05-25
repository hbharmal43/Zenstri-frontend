import { getFirebaseServices } from './firebase.js';
import { readConfig } from './config.js';

export class ApiClient {
  constructor({
    apiBaseUrl = readConfig().apiBaseUrl,
    getCurrentFirebaseUser = () => getFirebaseServices().auth.currentUser,
    fetchImpl = fetch
  } = {}) {
    this.apiBaseUrl = apiBaseUrl.replace(/\/$/, '');
    this.getCurrentFirebaseUser = getCurrentFirebaseUser;
    this.fetchImpl = fetchImpl;
  }

  async request(path, options = {}) {
    const user = this.getCurrentFirebaseUser();
    if (!user) {
      throw new Error('Sign in before calling the Zenstri API');
    }

    const token = await user.getIdToken();
    const response = await this.fetchImpl(`${this.apiBaseUrl}${path}`, {
      method: options.method || 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`API ${response.status}: ${body}`);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  syncCurrentUser(profile) {
    return this.request('/api/users/me', {
      method: 'POST',
      body: {
        displayName: profile.displayName,
        email: profile.email,
        photoURL: profile.photoURL
      }
    });
  }

  listProjects() {
    return this.request('/api/projects');
  }

  createProject({ repoFullName, liveUrl }) {
    return this.request('/api/projects', {
      method: 'POST',
      body: { repoFullName, liveUrl }
    });
  }

  createConsent(projectId) {
    return this.request(`/api/projects/${projectId}/consents`, {
      method: 'POST',
      body: {
        probeTypes: ['headers', 'cors', 'rate-limit', 'source-map', 'console'],
        consentTextVersion: '2026-05-24'
      }
    });
  }

  createAudit(projectId) {
    return this.request('/api/audits', {
      method: 'POST',
      body: {
        projectId,
        triggerType: 'on-demand'
      }
    });
  }

  getGitHubInstallUrl() {
    return this.request('/api/github/install-url');
  }
}
