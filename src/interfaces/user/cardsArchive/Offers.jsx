import { useEffect, useState } from "react";
import getOffers from "./functions/getOffers";
import Loading from "../../general/Loading";
import getGeneralCategories from "../../../functions/getGeneralCategories";
import OffersMainArea from "./OffersMainArea";
import OffersRightArea from "./OffersRightArea";
import Popup from "../../general/Popup";
import OpenOldOffer from "./OpenOldOffer";
import SendGift from "./SendGift";
import checkPermissions from "../../../functions/checkPermission";
import NotAllowdPage from "../../general/NotAllowedPage";
import getLocation from "../homePage/functions/getLocation";
import HeaderButton from "../../../components/mainArea";

function Offers(props) {
  const [offersPage, setOffersPage] = useState({ page: 1, size: 6, loadMore: true, loadingNow: false });
  const [filter, setFilter] = useState({ search: "", state: "عادي", typeOffer: -1, categoryIds: [] });
  const [openOffer, setOpenOffer] = useState(false);
  const [openSendGift, setOpenSendGift] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(false);
  const [location, setLocation] = useState({ status: "" });

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  useEffect(() => {
    setCurrentOffer(false);
    if (props.categories == -1) getGeneralCategories(props.setCategories, props.toast);
    if (!offersPage.loadingNow && checkPermissions(props.userInformation, ["user.myOffer"])) getOffers(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setOffers, props.offers, props.toast, filter, { ...offersPage, page: 1, loadMore: true }, setOffersPage);
  }, [filter]);

  try {
    return checkPermissions(props.userInformation, ["user.myOffer"]) ? (
      <>
        {props.offers == -1 || props.categories == -1 ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <Loading />
          </div>
        ) : (
          <>
            <HeaderButton />
            <OffersMainArea
              currentOffer={currentOffer}
              setCurrentOffer={setCurrentOffer}
              offers={props.offers}
              setOffers={props.setOffers}
              filter={filter}
              setFilter={setFilter}
              offersPage={offersPage}
              setOffersPage={setOffersPage}
              categories={props.categories}
              userInformation={props.userInformation}
              setUserInformation={props.setUserInformation}
              refreshStatus={props.refreshStatus}
              setRefreshStatus={props.setRefreshStatus}
              toast={props.toast}
              navigate={props.navigate}
              setOpenOffer={setOpenOffer}
            />
            <OffersRightArea currentOffer={currentOffer} setCurrentOffer={setCurrentOffer} offers={props.offers} setOffers={props.setOffers} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} setOpenSendGift={setOpenSendGift} />
          </>
        )}

        {openOffer ? (
          <>
            <Popup setOpen={setOpenOffer} component={<OpenOldOffer location={location} offer={openOffer} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
          </>
        ) : openSendGift ? (
          <>
            <Popup
              setOpen={setOpenSendGift}
              classes={"form-popup-small"}
              component={<SendGift offer={openSendGift} setCurrentOffer={setCurrentOffer} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} setEdit={setOpenSendGift} offers={props.offers} setOffers={props.setOffers} />}
            />
          </>
        ) : null}
      </>
    ) : (
      <NotAllowdPage />
    );
  } catch (err) {
    console.log(err);
  }
}

export default Offers;
