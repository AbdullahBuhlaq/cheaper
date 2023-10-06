import React, { useEffect, useRef } from "react";
import "intersection-observer";
import getPendingStores from "./functions/getPendingStores";

function LoadMorePendingStores(props) {
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
          if (props.pendingStoresPage.loadMore && !props.pendingStoresPage.loadingNow && !props.pendingStoresPage.OnlyClick) {
            getPendingStores(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setPendingStores, props.pendingStores, props.toast, props.filter, props.pendingStoresPage, props.setPendingStoresPage);
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
  }, [props.pendingStoresPage]);

  try {
    return (
      <>
        <div
          ref={targetRef}
          onClick={() => {
            if ((props.pendingStoresPage.loadMore && !props.pendingStoresPage.loadingNow) || props.pendingStoresPage.OnlyClick) getPendingStores(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setPendingStores, props.pendingStores, props.toast, props.filter, props.pendingStoresPage, props.setPendingStoresPage);
          }}
        >
          {props.pendingStoresPage.loadingNow ? "يتم التحميل ..." : props.pendingStoresPage.loadMore ? "المزيد" : "لا مزيد من المحلات"}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default LoadMorePendingStores;
