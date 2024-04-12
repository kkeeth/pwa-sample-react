import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

import type { FirebaseApp } from 'firebase/app';
import type { Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDgHLq3Fbkq9LXl73lgMeqBhNv93x2ZlYc",
  authDomain: "keeth-playground.firebaseapp.com",
  projectId: "keeth-playground",
  storageBucket: "keeth-playground.appspot.com",
  messagingSenderId: "69915345896",
  appId: "1:69915345896:web:5f47c873ab725f9b9a9a5d"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

const messaging: Messaging = getMessaging(app);

export { messaging };