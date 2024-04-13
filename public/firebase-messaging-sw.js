// Firebase SDKをインポート
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js');

// Firebaseを初期化
firebase.initializeApp({
  // Firebaseの設定を入力
});

// FCMのインスタンスを取得
const messaging = firebase.messaging();

// バックグラウンドでメッセージを受信したときのハンドラ
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  // 通知を表示する処理を記述
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/path/to/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
