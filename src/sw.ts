import { onBackgroundMessage } from 'firebase/messaging/sw'
import { initializeApp } from 'firebase/app'
import { getMessaging, isSupported } from 'firebase/messaging/sw'

import {firebaseConfig} from './firebase'

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
  .catch(e => {
    console.error(e);
  })
