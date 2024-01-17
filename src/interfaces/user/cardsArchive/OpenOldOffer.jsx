import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import getIcon from "../../../functions/getIcon";
import { defaultStory } from "../../../constants/story";
import AutoSlidingImages from "../../admin/users/profileSection/AutoSlider";
import Eva from "../../admin/stores/Eva";
import LoadMoreEvas from "../homePage/LoadMoreEvas";
import QRCode from "react-qr-code";
import getOfferEvas from "../homePage/functions/getOfferEvas";
import { TfiGift } from "react-icons/tfi";
import { GiPartyPopper } from "react-icons/gi";
import { PiMaskSadDuotone } from "react-icons/pi";
import jsonParse from "../../../functions/jsonParse";
import checkPermissions from "../../../functions/checkPermission";
import NotAllowdPage from "../../general/NotAllowedPage";
import Map from "../../../components/Map";
import Distance from "../../../functions/distance";

function OpenOldOffer(props) {
  const [eva, setEva] = useState(-1);
  const [evaPage, setEvaPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });

  useEffect(() => {
    if (props.offer != -1 && checkPermissions(props.userInformation, ["user.moreEvaluation"]) && !props.offer?.state) getOfferEvas(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setEva, eva, props.toast, evaPage, setEvaPage, props.offer.storeInfo.id);
  }, []);

  const [story, setStory] = useState([]);
  async function getStory() {
    let newStory = [];

    await Promise.all(
      props.offer.storeInfo.story.map((item) => {
        newStory = [...newStory, jsonParse(item.avatar)[3]];
      })
    );

    setStory(newStory);
  }
  useEffect(() => {
    if (props.offer != -1) getStory();
  }, [props.offer]);

  try {
    return (
      <>
        <>
          <div className="modal-left">
            <div className="modal-image-wrapper">
              <AutoSlidingImages images={props.offer.storeInfo.story.length ? story : defaultStory} />
            </div>

            <div className="modal-info-header">
              <div style={{ display: "flex" }}>
                <img src={props.offer.storeInfo.avatar ? jsonParse(props.offer.storeInfo.avatar)[0] : "images/user.webp"} style={{ width: "109px", height: "auto", borderRadius: "11px", margin: "0 8px" }} />
                <div className="left-side" style={{ padding: "10px 0" }}>
                  <h1 className="modalHeader-js">
                    لقد حصلت على خصم {props.offer.discount}% من محل {props.offer.storeInfo.nameStore}
                  </h1>
                  <p>العنوان : {props.offer.storeInfo.locationText}</p>
                </div>
              </div>
              {/* <div className="left-side">
                <h1 className="modalHeader-js">
                  لقد حصلت على خصم {props.offer.discount} من محل {props.offer.storeInfo.nameStore}
                </h1>
                <p>العنوان : {props.offer.storeInfo.locationtext}</p>
              </div> */}
              <div className="right-side">
                <span className="amount">
                  التصنيف : {props.offer.storeInfo.category.name + " "} {getIcon(props.offer.storeInfo.category.emoji)}
                </span>
              </div>
            </div>
            <div className="info-bar">
              <div className="info-wrapper">
                <div className="info-icon">
                  <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <span>{props.offer.storeInfo.user.phoneNumber}</span>
              </div>
              <div className="info-wrapper">
                <div className="info-icon">
                  <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                  </svg>
                </div>
                <span>بعيد {props.location.status == "success" ? Distance(props.location.location.coords.latitude, props.offer.storeInfo.latitude, props.location.location.coords.longitude, props.offer.storeInfo.longitude) : "X"} متر عنك</span>
              </div>
              <div className="info-wrapper">
                <div className="info-icon">
                  <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <span>الافتتاح: {props.offer.storeInfo.fromHour}</span>
              </div>
              <div className="info-wrapper">
                <div className="info-icon">
                  <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span>الاغلاق: {props.offer.storeInfo.toHour}</span>
              </div>
            </div>
            <div className="desc-wrapper" style={{ marginTop: "20px", marginLeft: "20px" }}>
              <Map width={"100%"} height={"500"} lat={props.offer.storeInfo.latitude} long={props.offer.storeInfo.longitude} />
            </div>
          </div>

          <div className="modal-right">
            {props.offer.state !== false ? (
              <>
                <div className="qr-code">
                  <span style={{ fontSize: "120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <TfiGift />
                    <span style={{ fontSize: "20px" }}>تم الإهداء إلى {props.offer.state.receiver}</span>
                  </span>
                </div>
              </>
            ) : props.offer.QR ? (
              <>
                <div className="qr-code">
                  <div style={{ padding: "10px", backgroundColor: "white" }}>
                    <QRCode fgColor="#0086d9" bgColor="white" size={512} style={{ height: "auto", maxWidth: "130px", width: "130px" }} value={props.offer.QR} viewBox={`0 0 256 256`} />
                  </div>
                  امسح ال QR عند المحل لاكتساب العرض
                </div>
              </>
            ) : props.offer.dataTake ? (
              <>
                <div className="qr-code">
                  <span style={{ fontSize: "120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <GiPartyPopper />
                    <span style={{ fontSize: "20px" }}>
                      تم استلام العرض <span style={{ color: "green" }}>🥳</span>
                    </span>
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="qr-code">
                  <span style={{ fontSize: "120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <PiMaskSadDuotone />
                    <span style={{ fontSize: "20px" }}>
                      لم يتم استلام العرض<span style={{ color: "green" }}>😕</span>
                    </span>
                  </span>
                </div>
              </>
            )}
            <div style={{ height: "calc(96% - 200px)", overflow: "auto" }}>
              {checkPermissions(props.userInformation, ["user.moreEvaluation"]) && !props.offer.state ? (
                eva != -1 ? (
                  <>
                    <div className="app-main-right-header">
                      <span>{props.offer.evaluateAverage === false ? "-" : (Math.round(props.offer.evaluateAverage * 100) / 100).toFixed(2)}</span>
                      <a href="#">التقييمات</a>
                    </div>
                    {eva.map((item, index) => {
                      return <Eva key={index} item={item} />;
                    })}
                    <LoadMoreEvas userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} setUsers={setEva} users={eva} toast={props.toast} usersPage={evaPage} setUsersPage={setEvaPage} id={props.offer.storeInfo.id} />
                  </>
                ) : (
                  <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Loading />
                  </div>
                )
              ) : (
                <NotAllowdPage message={"لا تملك الصلاحية لعرض التقييمات"} />
              )}
            </div>
          </div>
        </>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default OpenOldOffer;
