import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

import type { FirebaseApp } from "firebase/app";
import type { Messaging } from "firebase/messaging";

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

const isWebPushSupported =
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window;

if (!isWebPushSupported) {
  console.error("Web push is not supported in this browser");
} else {
  navigator.serviceWorker.register("/firebase-messaging-sw.js").then((sw) => {
    const permission = Notification.permission;

    if (permission === "granted") {
      console.log("Notification permission granted.");

      getToken(messaging, {
        serviceWorkerRegistration: sw,
      }).then((token) => {
        if (token) {
          console.log("FCM Token:", token);
        } else {
          console.log(
            "No registration token available. Request permission to generate one.",
          );
        }
      });
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
}

export { messaging };
