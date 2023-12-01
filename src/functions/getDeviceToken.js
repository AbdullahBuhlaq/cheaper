import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

async function getDeviceToken(toast) {
  try {
    let token = "";
    await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY }).then((currentToken) => {
      if (currentToken) {
        token = currentToken;
      } else {
        console.log("لا يمكن إرسال طلب التسجيل, يرجى إعطاء السماحية لقراءة رقم الجهاز من أجل استلام الإشعارات.");
        toast.error("لا يمكن إرسال طلب التسجيل, يرجى إعطاء السماحية لقراءة رقم الجهاز من أجل استلام الإشعارات.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
    return token;
  } catch (err) {
    console.log(err);
    return "sdf";
  }
}

export default getDeviceToken;
