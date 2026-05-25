import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getFirebaseServices } from './firebase.js';

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
  return signOutImpl(auth);
}

export function subscribeToAuthState(callback, services = getFirebaseServices()) {
  return onAuthStateChanged(services.auth, (user) => {
    callback(normalizeFirebaseUser(user), user);
  });
}
