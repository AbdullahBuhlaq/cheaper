import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener } from "./Firebase";
import { userImag } from "../../constants/story";

const NotificationListener = (props) => {
  const [notification, setNotification] = useState(false);

  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "40px", height: "40px", objectFit: "cover" }}>
            <img src={notification?.image ? notification.image : userImag} style={{ width: "40px", height: "40px", objectFit: "cover" }} />
          </div>
          <p style={{ marginRight: "10px" }}>
            <b>{notification?.title}</b>
          </p>
        </div>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      // props.setNotifications([{ title: notification.title, message: notification.body, avatar: notification.image }, ...props.notifications]);
      notify();
    }
  }, [notification]);

  onMessageListener()
    .then((payload) => {
      console.log(payload);
      setNotification({ image: payload?.notification.image, title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log("failed: ", err));

  return <Toaster />;
};

export default NotificationListener;
