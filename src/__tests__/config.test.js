import { describe, expect, it } from 'vitest';
import { readConfig } from '../config.js';

describe('readConfig', () => {
  it('returns Firebase and API config from an env object', () => {
    const config = readConfig({
      VITE_FIREBASE_API_KEY: 'key',
      VITE_FIREBASE_AUTH_DOMAIN: 'zenstri-demo.firebaseapp.com',
      VITE_FIREBASE_PROJECT_ID: 'zenstri-demo',
      VITE_FIREBASE_STORAGE_BUCKET: 'zenstri-demo.appspot.com',
      VITE_FIREBASE_MESSAGING_SENDER_ID: 'sender',
      VITE_FIREBASE_APP_ID: 'app',
      VITE_API_BASE_URL: 'http://localhost:8080'
    });

    expect(config.apiBaseUrl).toBe('http://localhost:8080');
    expect(config.firebase.projectId).toBe('zenstri-demo');
  });

  it('throws a readable error when required values are missing', () => {
    expect(() => readConfig({})).toThrow('Missing required frontend env vars');
  });
});
