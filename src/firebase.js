import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { readConfig } from './config.js';

let firebaseServices;

export function getFirebaseServices(config = readConfig()) {
  if (firebaseServices) {
    return firebaseServices;
  }

  const app = initializeApp(config.firebase);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const githubProvider = new GithubAuthProvider();

  firebaseServices = { app, auth, db, githubProvider };
  return firebaseServices;
}
