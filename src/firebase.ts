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

const app: FirebaseApp = initializeApp(firebaseConfig);
const messaging: Messaging = getMessaging(app);


console.log(navigator)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((sw) => {
      console.log(sw)
      getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: sw,
      }).then((token) => {
        console.log(token)
        });
    })
    .catch((err) => {
      console.error('Service Worker registration failed', err);
    });
}


export { messaging };