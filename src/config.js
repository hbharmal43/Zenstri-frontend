const REQUIRED_ENV_KEYS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_API_BASE_URL'
];

export function readConfig(env = import.meta.env) {
  const missing = REQUIRED_ENV_KEYS.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required frontend env vars: ${missing.join(', ')}`);
  }

  return {
    apiBaseUrl: env.VITE_API_BASE_URL.replace(/\/$/, ''),
    firebase: {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID
    }
  };
}
