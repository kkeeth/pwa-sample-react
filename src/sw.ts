import { onBackgroundMessage } from 'firebase/messaging/sw'
import { initializeApp } from 'firebase/app'
import { getMessaging, isSupported } from 'firebase/messaging/sw'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

declare let self: ServiceWorkerGlobalScope
const app = initializeApp(firebaseConfig);

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

isSupported()
  .then(() => {
    const messaging: Messaging = getMessaging(app);

    onBackgroundMessage(messaging, (payload) => {
      console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
      )
      const { title, body, image } = payload.notification ?? {}

      if (!title) {
        return
      }

      self.registration.showNotification(title, {
        body,
        icon: image
      })
    })
  })
  .catch(error => {
    console.error(error);
  })
