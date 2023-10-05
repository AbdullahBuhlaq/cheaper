import React, { useEffect, useRef } from "react";
import "intersection-observer";
import getAcceptedStores from "./functions/getAcceptedStores";

function LoadMoreAcceptedStores(props) {
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
          if (props.acceptedStoresPage.loadMore && !props.acceptedStoresPage.loadingNow && !props.acceptedStoresPage.OnlyClick) {
            getAcceptedStores(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setAcceptedStores, props.acceptedStores, props.toast, props.filter, props.acceptedStoresPage, props.setAcceptedStoresPage);
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
  }, [props.acceptedStoresPage]);

  try {
    return (
      <>
        <div
          ref={targetRef}
          onClick={() => {
            if ((props.acceptedStoresPage.loadMore && !props.acceptedStoresPage.loadingNow) || props.acceptedStoresPage.OnlyClick) getAcceptedStores(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setAcceptedStores, props.acceptedStores, props.toast, props.filter, props.acceptedStoresPage, props.setAcceptedStoresPage);
          }}
        >
          {props.acceptedStoresPage.loadingNow ? "loading ..." : props.acceptedStoresPage.loadMore ? "more users" : "no more stores"}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default LoadMoreAcceptedStores;
