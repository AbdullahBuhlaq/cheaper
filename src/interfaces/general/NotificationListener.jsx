import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener } from "./Firebase";

const NotificationListener = () => {
  const [notification, setNotification] = useState(false);

  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "40px", aspectRatio: "1 / 1", objectFit: "cover" }}>
            <img src={notification?.image ? notification.image : "images/user.webp"} style={{ width: "100%", objectFit: "cover" }} alt="" />
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
      notify();
    }
  }, [notification]);

  onMessageListener()
    .then((payload) => {
      console.log("recieved");
      setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
    })
    .catch((err) => console.log("failed: ", err));

  return <Toaster />;
};

export default NotificationListener;
