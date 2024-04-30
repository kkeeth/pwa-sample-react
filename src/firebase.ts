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
}
export const confirmPushNotification = async (): Promise<
  string | undefined
> => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  return navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(async (sw) => {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        console.log("Unable to get permission to notify.");
      } else {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification("Web Push Granted!");

        console.log("Notification permission granted.");

        return getToken(messaging, {
          serviceWorkerRegistration: sw,
        }).then((token) => {
          if (!token) {
            console.log(
              "No registration token available. Request permission to generate one.",
            );
          } else {
            console.log("FCM Token:", token);
            return token;
          }
        });
      }
    });
};

export { messaging };
