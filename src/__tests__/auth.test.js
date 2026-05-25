import { describe, expect, it, vi } from 'vitest';
import { normalizeFirebaseUser, signInWithGitHub, signOutUser } from '../auth.js';

describe('normalizeFirebaseUser', () => {
  it('maps a Firebase user to the profile sent to the backend', () => {
    const profile = normalizeFirebaseUser({
      uid: 'uid-1',
      displayName: 'Ada',
      email: 'ada@example.com',
      photoURL: 'https://example.com/a.png',
      providerData: [{ providerId: 'github.com', uid: '12345' }]
    });

    expect(profile).toEqual({
      uid: 'uid-1',
      displayName: 'Ada',
      email: 'ada@example.com',
      photoURL: 'https://example.com/a.png',
      githubProviderUid: '12345'
    });
  });
});

describe('auth actions', () => {
  it('signs in with the GitHub provider', async () => {
    const signIn = vi.fn().mockResolvedValue({ user: { uid: 'uid-1' } });
    const provider = { addScope: vi.fn() };

    const result = await signInWithGitHub({
      auth: {},
      provider,
      signInWithPopupImpl: signIn
    });

    expect(provider.addScope).toHaveBeenCalledWith('read:user');
    expect(signIn).toHaveBeenCalledWith({}, provider);
    expect(result.user.uid).toBe('uid-1');
  });

  it('signs out through Firebase Auth', async () => {
    const signOutImpl = vi.fn().mockResolvedValue();

    await signOutUser({ auth: {}, signOutImpl });

    expect(signOutImpl).toHaveBeenCalledWith({});
  });
});
