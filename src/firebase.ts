import { initializeApp } from "firebase/app";
import { getMessaging } from 'firebase/messaging'


const firebaseConfig = {
  apiKey: "AIzaSyBgOfc3dWwvbVSNh2YiTM1BrT7zE89lrFU",
  authDomain: "sample-project-14efb.firebaseapp.com",
  projectId: "sample-project-14efb",
  storageBucket: "sample-project-14efb.appspot.com",
  messagingSenderId: "848517858655",
  appId: "1:848517858655:web:1b478b9a7fe61bd321e2ea"
};

export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app)