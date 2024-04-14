import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

import type { FirebaseApp } from 'firebase/app';
import type { Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const sw = await window.navigator.serviceWorker.register('/firebase-messaging-sw.js')
console.log(sw)

const app: FirebaseApp = initializeApp(firebaseConfig);
const messaging: Messaging = getMessaging(app);
const token = await getToken(messaging, {
  serviceWorkerRegistration: sw
})
console.log(token)


export { messaging };