import { describe, expect, it, vi } from 'vitest';
import { ApiClient } from '../api.js';

function createUser(token = 'token-123') {
  return {
    getIdToken: vi.fn().mockResolvedValue(token)
  };
}

describe('ApiClient', () => {
  it('sends Firebase ID token and JSON body', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'project-1' })
    });
    const client = new ApiClient({
      apiBaseUrl: 'http://localhost:8080',
      getCurrentFirebaseUser: () => createUser(),
      fetchImpl
    });

    const result = await client.createProject({
      repoFullName: 'demo/app',
      liveUrl: 'https://demo.example'
    });

    expect(result.id).toBe('project-1');
    expect(fetchImpl).toHaveBeenCalledWith('http://localhost:8080/api/projects', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer token-123',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        repoFullName: 'demo/app',
        liveUrl: 'https://demo.example'
      })
    });
  });

  it('throws when no Firebase user is signed in', async () => {
    const client = new ApiClient({
      apiBaseUrl: 'http://localhost:8080',
      getCurrentFirebaseUser: () => null,
      fetchImpl: vi.fn()
    });

    await expect(client.listProjects()).rejects.toThrow('Sign in before calling the Zenstri API');
  });

  it('includes backend error body in thrown errors', async () => {
    const client = new ApiClient({
      apiBaseUrl: 'http://localhost:8080',
      getCurrentFirebaseUser: () => createUser(),
      fetchImpl: vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        text: async () => 'consent required'
      })
    });

    await expect(client.createAudit('project-1')).rejects.toThrow('API 403: consent required');
  });
});
