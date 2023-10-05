import { useEffect, useState } from "react";
import getOffer from "./function/getOffer";
import SecondLoading from "../../../general/SecondLoading";
import StoreCard from "./StoreCard";
import "./css/rate.css";

function StorePopup(props) {
  const [storeInfo, setStoreInfo] = useState(-1);
  useEffect(() => {
    getOffer(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.id, props.userId, setStoreInfo, props.toast);
  }, []);
  try {
    return (
      <>
        {storeInfo == -1 ? (
          <SecondLoading />
        ) : (
          <>
            <StoreCard store={storeInfo} userName={props.userName} userAvatar={props.userAvatar} />
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StorePopup;
