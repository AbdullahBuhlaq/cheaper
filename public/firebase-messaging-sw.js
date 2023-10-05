// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyA_bgodli2-g1uBbmdHXv9ivm_jJyXHT7g",
  authDomain: "test-fire-73c04.firebaseapp.com",
  projectId: "test-fire-73c04",
  storageBucket: "test-fire-73c04.appspot.com",
  messagingSenderId: "779734350239",
  appId: "1:779734350239:web:f66523756bb5967d6b65aa",
  measurementId: "G-EX6J5BD7D8",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
