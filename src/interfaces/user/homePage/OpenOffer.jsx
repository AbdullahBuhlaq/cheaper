import { useEffect, useState } from "react";
import checkVpn from "./functions/checkVPN";
import Loading from "../../general/Loading";
import FailVideo from "../../general/FailVideo";
import getLocation from "./functions/getLocation";
import getCity from "./functions/getCity";
import getOffer from "./functions/getOffer";
import getIcon from "../../../functions/getIcon";
import { defaultStory, storeImag } from "../../../constants/story";
import AutoSlidingImages from "../../admin/users/profileSection/AutoSlider";
import getOfferEvas from "./functions/getOfferEvas";
import Eva from "../../admin/stores/Eva";
import LoadMoreEvas from "./LoadMoreEvas";
import QRCode from "react-qr-code";
import NotAllowdPage from "../../general/NotAllowedPage";
import checkPermissions from "../../../functions/checkPermission";
import Map from "../../../components/Map";
import Distance from "../../../functions/distance";
import getAvater from "../../../functions/getAvater";

function OpenOffer(props) {
  const [status, setStatus] = useState("check");
  const [offer, setOffer] = useState(-1);
  const [msg, setMsg] = useState("");
  const [location, setLocation] = useState({ status: "" });
  const [city, setCity] = useState({ status: "" });
  const [eva, setEva] = useState(-1);
  const [evaPage, setEvaPage] = useState({
    page: 1,
    size: 5,
    loadMore: true,
    loadingNow: false,
  });

  async function initialOpen() {
    let check = await checkVpn();
    if (check == "honest") {
      getLocation(setLocation);
    } else {
      setMsg(check);
      setStatus("fail");
    }
  }

  useEffect(() => {
    initialOpen();
  }, []);

  useEffect(() => {
    if (location.status == "success") {
      if (offer == -1)
        getOffer(
          props.isGift,
          props.setIsGift,
          props.setRun,
          setOffer,
          setStatus,
          props.setOpen,
          city,
          location,
          props.homeInfo,
          props.setHomeInfo,
          props.userInformation,
          props.setUserInformation,
          props.refreshStatus,
          props.setRefreshStatus,
          props.toast
        );
    } else if (location.status == "error") {
      props.toast.error(location.message, {
        position: props.toast.POSITION.TOP_CENTER,
      });
      setMsg(location.message);
      setStatus("fail");
    }
  }, [location]);

  // useEffect(() => {
  //   if (city.status == "error") {
  //     props.toast.error(city.message, {
  //       position: props.toast.POSITION.TOP_CENTER,
  //     });
  //     setMsg(city.message);
  //     setStatus("fail");
  //   } else if (city.status == "success") {
  //     if (offer == -1) getOffer(props.isGift, props.setIsGift, props.setRun, setOffer, setStatus, props.setOpen, city, location, props.homeInfo, props.setHomeInfo, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
  //   }
  // }, [city]);

  useEffect(() => {
    if (
      offer != -1 &&
      checkPermissions(props.userInformation, ["user.moreEvaluation"])
    )
      getOfferEvas(
        props.userInformation,
        props.setUserInformation,
        props.refreshStatus,
        props.setRefreshStatus,
        setEva,
        eva,
        props.toast,
        evaPage,
        setEvaPage,
        offer.storeId
      );
  }, [offer]);

  const [story, setStory] = useState([]);
  async function getStory() {
    let newStory = [];

    await Promise.all(
      offer.story.map((item) => {
        newStory = [...newStory, getAvater(item.avatar)];
      })
    );

    setStory(newStory);
  }
  useEffect(() => {
    if (offer != -1) getStory();
  }, [offer]);

  try {
    return (
      <>
        {status == "check" ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        ) : status == "fail" ? (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FailVideo />
              <span>
                {msg
                  ? msg
                  : "يبدو أن هناك مشكلة في الاتصال الرجاء التحقق من الشبكة وإعادة المحاولة"}
              </span>
            </div>
          </>
        ) : offer != -1 ? (
          <>
            <div className="modal-left">
              <div className="modal-image-wrapper">
                <AutoSlidingImages
                  images={offer.story.length ? story : defaultStory}
                />
              </div>

              <div className="modal-info-header">
                <div style={{ display: "flex" }}>
                  <img
                    src={
                      offer.avatarStore
                        ? getAvater(offer.avatarStore)
                        : storeImag
                    }
                    style={{
                      width: "110px",
                      height: "110px",
                      borderRadius: "11px",
                      margin: "0 8px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="left-side" style={{ padding: "10px 0" }}>
                    <h1 className="modalHeader-js">
                      لقد حصلت على خصم {offer.discount}% من محل{" "}
                      {offer.nameStore}
                    </h1>
                    <p>العنوان : {offer.locationText}</p>
                  </div>
                </div>
                {/* <div className="left-side">
                  <h1 className="modalHeader-js">لقد حصلت على خصم {offer.discount} من محل {offer.nameStore}</h1>
                  <p>العنوان : {offer.locationtext}</p>
                </div> */}
                <div className="right-side">
                  <span className="amount">
                    التصنيف : {offer.category.name + " "}{" "}
                    {getIcon(offer.category.emoji)}
                  </span>
                </div>
              </div>
              <div className="info-bar">
                <div className="info-wrapper">
                  <div className="info-icon">
                    <svg
                      className="btn-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  </div>
                  <span>{offer.phoneNumber}</span>
                </div>
                <div className="info-wrapper">
                  <div className="info-icon">
                    <svg
                      className="btn-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                    </svg>
                  </div>
                  <span>
                    بعيد{" "}
                    {Distance(
                      location.location.coords.latitude,
                      offer.latitude,
                      location.location.coords.longitude,
                      offer.longitude
                    )}{" "}
                    متر عنك
                  </span>
                </div>
                <div className="info-wrapper">
                  <div className="info-icon">
                    <svg
                      className="btn-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                    </svg>
                  </div>
                  <span>وقت الافتتاح : {offer.fromHour}</span>
                </div>
                <div className="info-wrapper">
                  <div className="info-icon">
                    <svg
                      className="btn-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <span>وقت الاغلاق : {offer.toHour}</span>
                </div>
              </div>
              <div
                className="desc-wrapper"
                style={{ marginTop: "20px", marginLeft: "20px" }}
              >
                <Map
                  width={"100%"}
                  height={"500"}
                  lat={offer.latitude}
                  long={offer.longitude}
                />
              </div>
            </div>

            <div className="modal-right">
              <div className="qr-code">
                <div style={{ padding: "10px", backgroundColor: "white" }}>
                  <QRCode
                    fgColor="#0086d9"
                    bgColor="white"
                    size={512}
                    style={{
                      height: "auto",
                      maxWidth: "130px",
                      width: "130px",
                    }}
                    value={offer.QR}
                    viewBox={`0 0 256 256`}
                  />
                </div>
                امسح ال QR عند المحل لاكتساب العرض
              </div>

              <div style={{ height: "calc(96% - 200px)", overflow: "auto" }}>
                {checkPermissions(props.userInformation, [
                  "user.moreEvaluation",
                ]) ? (
                  eva == -1 ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Loading />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="app-main-right-header">
                        <span>
                          {offer.evaluate === null
                            ? "-"
                            : (Math.round(offer.evaluate * 100) / 100).toFixed(
                                2
                              )}
                        </span>
                        <a href="#">التقييمات</a>
                      </div>
                      {eva.map((item, index) => {
                        return <Eva key={index} item={item} />;
                      })}
                      <LoadMoreEvas
                        userInformation={props.userInformation}
                        setUserInformation={props.setUserInformation}
                        refreshStatus={props.refreshStatus}
                        setRefreshStatus={props.setRefreshStatus}
                        setUsers={setEva}
                        users={eva}
                        toast={props.toast}
                        usersPage={evaPage}
                        setUsersPage={setEvaPage}
                        id={offer.storeId}
                      />
                    </>
                  )
                ) : (
                  <NotAllowdPage message={"لا تملك الصلاحية لعرض التقييمات"} />
                )}
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default OpenOffer;
