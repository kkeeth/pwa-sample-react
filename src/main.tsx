import React from 'react'
import ReactDOM from 'react-dom/client'
import { Workbox } from 'workbox-window';
import App from './App.tsx'
import './index.css'
import { messaging } from './firebase'; // 追加

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  wb.addEventListener('activated', async (event) => {
    if (!event.isUpdate) {
      console.log('Service worker activated for the first time!');

      // Service Worker がアクティブになったら通知許可を求める
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        messaging.getToken().then((token) => {
          console.log('Token:', token);
        });
      }
    }
  });

  wb.register();
}