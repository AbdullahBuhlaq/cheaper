import React, { useEffect, useRef } from "react";
import "intersection-observer";
import getNotifications from "../functions/getNotifications";

function LoadMoreNotifications(props) {
  const targetRef = useRef(null);

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.5,
  //   };

  //   function handleIntersection(entries, observer) {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         if (props.notificationsPage.loadMore && !props.notificationsPage.loadingNow) {
  //           getNotifications(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setNotifications, props.notifications, props.toast, props.notificationsPage, props.setNotificationsPage);
  //         }
  //       }
  //     });
  //   }

  //   const observer = new IntersectionObserver(handleIntersection, options);

  //   if (targetRef.current) {
  //     observer.observe(targetRef.current);
  //   }

  //   return () => {
  //     if (targetRef.current) {
  //       observer.unobserve(targetRef.current);
  //     }
  //   };
  // }, [props.notificationsPage]);

  try {
    return (
      <>
        <div
          ref={targetRef}
          onClick={() => {
            if (props.notificationsPage.loadMore && !props.notificationsPage.loadingNow) getNotifications(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setNotifications, props.notifications, props.toast, props.notificationsPage, props.setNotificationsPage);
          }}
        >
          {props.notificationsPage.loadingNow ? "يتم التحميل ..." : props.notificationsPage.loadMore ? "المزيد" : "لا مزيد من الإشعارات"}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default LoadMoreNotifications;
