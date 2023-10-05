import { useEffect, useState } from "react";
import getHomeInfo from "./functions/getHomeInfo";
import "./css/homeStyle.css";
import MainArea from "./MainArea";
import RightArea from "./RightArea";
import Popup from "../../general/Popup";
import OpenOffer from "./OpenOffer";
import Loading from "../../general/Loading";

function HomeOfUser(props) {
  const [openOffer, setOpenOffer] = useState(false);

  useEffect(() => {
    if (props.homeInfo == -1) getHomeInfo(props.setHomeInfo, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
  }, []);

  try {
    return (
      <>
        {props.homeInfo == -1 ? (
          <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Loading />
          </div>
        ) : (
          <>
            <MainArea setOpenOffer={setOpenOffer} homeInfo={props.homeInfo} toast={props.toast} />
            <RightArea homeInfo={props.homeInfo} />

            {openOffer ? <Popup setOpen={setOpenOffer} component={<OpenOffer setOpen={setOpenOffer} homeInfo={props.homeInfo} setHomeInfo={props.setHomeInfo} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />} /> : null}
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default HomeOfUser;
