import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getFirebaseServices } from './firebase.js';

let currentMockUser = null;
const authObservers = [];

export function normalizeFirebaseUser(user) {
  if (!user) {
    return null;
  }

  const githubProvider = user.providerData?.find((provider) => provider.providerId === 'github.com');

  return {
    uid: user.uid,
    displayName: user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || '',
    githubProviderUid: githubProvider?.uid || null
  };
}

export async function signInWithGitHub({
  auth,
  provider,
  signInWithPopupImpl = signInWithPopup
} = getFirebaseServices()) {
  provider.addScope('read:user');
  return signInWithPopupImpl(auth, provider);
}

export async function signOutUser({
  auth,
  signOutImpl = signOut
} = getFirebaseServices()) {
  if (currentMockUser) {
    clearGuestSession();
    return;
  }
  return signOutImpl(auth);
}

export function subscribeToAuthState(callback, services = getFirebaseServices()) {
  authObservers.push(callback);

  const unsubscribe = onAuthStateChanged(services.auth, (user) => {
    if (!currentMockUser) {
      callback(normalizeFirebaseUser(user), user);
    }
  });

  if (currentMockUser) {
    callback(currentMockUser.profile, currentMockUser.user);
  }

  return () => {
    unsubscribe();
    const index = authObservers.indexOf(callback);
    if (index !== -1) {
      authObservers.splice(index, 1);
    }
  };
}

export function signInAsGuest() {
  const mockUser = {
    uid: 'mock-guest-uid',
    displayName: 'Guest User',
    email: 'guest@zenstri.dev',
    photoURL: 'https://avatars.githubusercontent.com/u/9919',
    getIdToken: async () => 'mock-guest-token'
  };

  currentMockUser = {
    profile: {
      uid: mockUser.uid,
      displayName: mockUser.displayName,
      email: mockUser.email,
      photoURL: mockUser.photoURL,
      githubProviderUid: '9919'
    },
    user: mockUser
  };

  for (const observer of authObservers) {
    observer(currentMockUser.profile, currentMockUser.user);
  }
}

export function clearGuestSession() {
  currentMockUser = null;
  const services = getFirebaseServices();
  const user = services.auth.currentUser;
  for (const observer of authObservers) {
    observer(normalizeFirebaseUser(user), user);
  }
}

