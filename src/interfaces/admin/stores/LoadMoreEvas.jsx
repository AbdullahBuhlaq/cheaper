import React, { useEffect, useRef } from "react";
import "intersection-observer";
import Loading from "../../general/Loading";
import getSpam from "./functions/getSpam";
import getEva from "./functions/getEva";

function LoadMoreEvas(props) {
  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    function handleIntersection(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (props.usersPage.loadMore && !props.usersPage.loadingNow && !props.usersPage.OnlyClick) {
            getEva(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setUsers, props.users, props.toast, props.usersPage, props.setUsersPage, props.id);
          }
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [props.usersPage]);

  try {
    return (
      <>
        <div
          ref={targetRef}
          onClick={() => {
            if ((props.usersPage.loadMore && !props.usersPage.loadingNow) || props.usersPage.OnlyClick) getEva(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setUsers, props.users, props.toast, props.usersPage, props.setUsersPage, props.id);
          }}
        >
          {props.usersPage.loadingNow ? "يتم التحميل ..." : props.usersPage.loadMore ? "المزيد" : "لا مزيد من التقييمات"}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default LoadMoreEvas;
