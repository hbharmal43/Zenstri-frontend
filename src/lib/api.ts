export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  githubConnected: boolean;
}

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  }

  private async request(path: string, token: string, options: RequestInit = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(err.detail || 'Request failed');
    }
    return res.json();
  }

  async syncUser(token: string, profile: { displayName: string | null; email: string | null; photoURL: string | null }): Promise<UserProfile> {
    return this.request('/api/users/me', token, {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async createProject(token: string, repo: string, liveUrl: string) {
    return this.request('/api/projects', token, {
      method: 'POST',
      body: JSON.stringify({ repoFullName: repo, liveUrl }),
    });
  }

  async createConsent(token: string, projectId: string) {
    return this.request(`/api/projects/${projectId}/consents`, token, {
      method: 'POST',
      body: JSON.stringify({
        probeTypes: ["headers", "cors", "rate-limit", "source-map", "console"],
        consentTextVersion: "2026-05-24"
      }),
    });
  }

  async createAudit(token: string, projectId: string) {
    return this.request('/api/audits', token, {
      method: 'POST',
      body: JSON.stringify({ projectId, triggerType: 'on-demand' }),
    });
  }

  async getGitHubInstallUrl(token: string): Promise<{ installUrl: string }> {
    return this.request('/api/github/install-url', token);
  }
}
export const api = new ApiClient();
