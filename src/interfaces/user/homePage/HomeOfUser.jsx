import { useEffect, useState } from "react";
import getHomeInfo from "./functions/getHomeInfo";
import "./css/homeStyle.css";
import MainArea from "./MainArea";
import RightArea from "./RightArea";
import Popup from "../../general/Popup";
import OpenOffer from "./OpenOffer";
import Loading from "../../general/Loading";
import checkPermissions from "../../../functions/checkPermission";
import WinGift from "./WinGift";
import HeaderButton from "../../../components/mainArea";

function HomeOfUser(props) {
  const [openOffer, setOpenOffer] = useState(false);
  const [winGift, setWinGift] = useState(false);
  const [isGift, setIsGift] = useState(false);

  useEffect(() => {
    if (props.homeInfo == -1 && checkPermissions(props.userInformation, ["user.home"])) getHomeInfo(setWinGift, props.setHomeInfo, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
  }, []);

  try {
    return (
      <>
        <>
          <HeaderButton />
          <MainArea setOpenOffer={setOpenOffer} setIsGift={setIsGift} userInformation={props.userInformation} homeInfo={props.homeInfo} toast={props.toast} />
          <RightArea userInformation={props.userInformation} homeInfo={props.homeInfo} />

          {winGift ? <Popup setOpen={setWinGift} component={<WinGift setWinGift={setWinGift} setRun={props.setRun} />} /> : null}
          {openOffer ? (
            <Popup setOpen={setOpenOffer} component={<OpenOffer isGift={isGift} setIsGift={setIsGift} setRun={props.setRun} setOpen={setOpenOffer} homeInfo={props.homeInfo} setHomeInfo={props.setHomeInfo} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />} />
          ) : null}
        </>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default HomeOfUser;
