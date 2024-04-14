import { initializeApp } from "firebase/app";
import {
  getMessaging,
  isSupported,
  onBackgroundMessage,
} from "firebase/messaging/sw";
import type { Messaging } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  vapidKey: process.env.VITE_FIREBASE_VAPID_KEY,
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
declare let self: any;
const app = initializeApp(firebaseConfig);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
self.addEventListener("activate", (event: any) => {
  event.waitUntil(self.clients.claim());
});

isSupported()
  .then(() => {
    const messaging: Messaging = getMessaging(app);

    onBackgroundMessage(messaging, (payload) => {
      console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
      );
      const { title, body, image } = payload.notification ?? {};

      if (!title) {
        return;
      }

      self.registration.showNotification(title, {
        body,
        icon: image,
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });
