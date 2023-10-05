import { useEffect, useState } from "react";
import getOffers from "./functions/getOffers";
import Loading from "../../general/Loading";
import getGeneralCategories from "../../../functions/getGeneralCategories";
import OffersMainArea from "./OffersMainArea";
import OffersRightArea from "./OffersRightArea";
import Popup from "../../general/Popup";
import OpenOldOffer from "./OpenOldOffer";
import SendGift from "./SendGift";

function Offers(props) {
  const [offersPage, setOffersPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [filter, setFilter] = useState({ search: "", state: -1, typeOffer: -1, categoryIds: [] });
  const [openOffer, setOpenOffer] = useState(false);
  const [openSendGift, setOpenSendGift] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(false);

  useEffect(() => {
    if (props.categories == -1) getGeneralCategories(props.setCategories, props.toast);
    if (!offersPage.loadingNow) getOffers(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setOffers, props.offers, props.toast, filter, { ...offersPage, page: 1, loadMore: true }, setOffersPage);
  }, [filter]);

  try {
    return (
      <>
        {props.offers == -1 || props.categories == -1 ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <Loading />
          </div>
        ) : (
          <>
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
            <Popup setOpen={setOpenOffer} component={<OpenOldOffer offer={openOffer} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
          </>
        ) : openSendGift ? (
          <>
            <Popup
              setOpen={setOpenSendGift}
              classes={"form-popup-small"}
              component={<SendGift offer={openSendGift} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} setEdit={setOpenSendGift} offers={props.offers} setOffers={props.setOffers} />}
            />
          </>
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Offers;
