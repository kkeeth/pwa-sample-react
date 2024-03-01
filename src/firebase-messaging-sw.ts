import { getMessaging, getToken } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

const messaging = getMessaging();
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_MESSAGING_KEY })
      .then((currentToken) => {
        console.log(currentToken)
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one.",
          );
          // ...
        }
      })
      .catch((err) => {
        console.error("An error occurred while retrieving token. ", err);
        // ...
      });
  } else {
    console.log('Unable to get permission to notify.');
  }
});

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});