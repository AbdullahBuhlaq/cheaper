import { useEffect, useState } from "react";
import "./css/storePopup.css";
import Loading from "../../general/Loading";
import getInformation from "./functions/getInformation";
import AutoSlidingImages from "../users/profileSection/AutoSlider";
import { defaultSecondStory, defaultStory, userImag } from "../../../constants/story";
import getIcon from "../../../functions/getIcon";
import getSpam from "./functions/getSpam";
import getEva from "./functions/getEva";
import LoadMoreSpams from "./LoadMoreSpams";
import LoadMoreEvas from "./LoadMoreEvas";
import Eva from "./Eva";
import Spam from "./Spam";
import jsonParse from "../../../functions/jsonParse";
import checkPermissions from "../../../functions/checkPermission";
import Map from "../../../components/Map";

function PopupStore(props) {
  const [openOptions, setOpenOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [information, setInformation] = useState(-1);
  const [spam, setSpam] = useState(-1);
  const [spamPage, setSpamPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [eva, setEva] = useState(-1);
  const [evaPage, setEvaPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });

  useEffect(() => {
    if (information == -1) getInformation(props.store.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, setInformation);
    if (spam == -1) getSpam(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setSpam, spam, props.toast, spamPage, setSpamPage, props.store.id);
    if (eva == -1) getEva(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setEva, eva, props.toast, evaPage, setEvaPage, props.store.id);
  }, []);

  useEffect(() => {
    if (information != -1 && spam != -1 && eva != -1) setLoading(false);
  }, [information, spam, eva]);

  const [story, setStory] = useState([]);
  async function getStory() {
    let newStory = [];

    await Promise.all(
      information.storeInfo.story.map((item) => {
        newStory = [...newStory, jsonParse(item.avatar)[3]];
      })
    );

    setStory(newStory);
  }
  useEffect(() => {
    if (information != -1) getStory();
  }, [information]);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.className != "dropbtn") {
        setOpenOptions(false);
      }
    });
  }, []);

  try {
    return (
      <>
        {loading ? (
          <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Loading />
          </div>
        ) : (
          <>
            <div className="modal-left">
              <div className="modal-image-wrapper">
                <AutoSlidingImages images={information.storeInfo.story.length ? story : defaultStory} />
              </div>
              <div className="modal-info-header">
                <div style={{ display: "flex" }}>
                  <img src={information.storeInfo["user.avatar"] ? jsonParse(information.storeInfo["user.avatar"])[0] : userImag} style={{ width: "109px", height: "109px", borderRadius: "11px", margin: "0 8px", objectFit: "cover" }} />
                  <div className="left-side" style={{ justifyContent: "space-evenly" }}>
                    <h1 className="modalHeader-js">{information.storeInfo["user.name"]}</h1>
                    <p>{information.storeInfo.locationText}</p>
                  </div>
                </div>

                {/* <div className="right-side">
                  <span className="amount">التصنيف : {props.store["category.name"] + " " + getIcon(props.store["category.emoji"])}</span>
                </div> */}
                <div className="right-side">
                  <div className="dropdown">
                    <button onClick={() => setOpenOptions(!openOptions)} className="dropbtn">
                      •••
                    </button>
                    <ul id="myDropdown" className={"dropdown-content" + (openOptions ? " show" : "")}>
                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            props.navigate("/stores/" + props.store.id);
                          }}
                        >
                          عرض الحساب الشخصي
                        </a>
                      </li>
                      {checkPermissions(props.userInformation, ["admin.store.disable", "admin.store.enable"]) ? (
                        <li>
                          {props.store.deletedAt ? (
                            checkPermissions(props.userInformation, ["admin.store.enable"]) ? (
                              <a
                                href="#"
                                onClick={() => {
                                  props.enableAcceptedStore(props.store.id);
                                }}
                              >
                                إعادة تفعيل
                              </a>
                            ) : null
                          ) : checkPermissions(props.userInformation, ["admin.store.disable"]) ? (
                            <a
                              href="#"
                              onClick={() => {
                                props.deleteNewStore(props.store.id);
                              }}
                            >
                              حذف
                            </a>
                          ) : null}
                        </li>
                      ) : null}
                    </ul>
                  </div>
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
                  <span>الرقم: {information.storeInfo["user.phoneNumber"]}</span>
                </div>
                <div className="info-wrapper">
                  <div className="info-icon">
                    <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                    </svg>
                  </div>
                  <span>
                    التصنيف: {props.store["category.name"]}
                    {getIcon(props.store["category.emoji"])}
                  </span>
                </div>
                <div className="info-wrapper">
                  <div className="info-icon">
                    <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    </svg>
                  </div>
                  <span>الافتتاح: {information.storeInfo.fromHour}</span>
                </div>
                <div className="info-wrapper">
                  <div className="info-icon">
                    <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <span>الاغلاق: {information.storeInfo.toHour}</span>
                </div>
              </div>

              <div className="desc-wrapper" style={{ marginTop: "20px", marginLeft: "20px" }}>
                <Map width={"100%"} height={"500"} lat={information.storeInfo.latitude} long={information.storeInfo.longitude} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "30%" }} className="modal-right-container">
              <div className="modal-right" style={{ height: "48%" }}>
                <div className="app-main-right-header">
                  <span>{information.spam}</span>
                  <a href="#">الإبلاغات</a>
                </div>
                {spam.map((item, index) => {
                  return <Spam key={index} item={item} />;
                })}

                <LoadMoreSpams userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} setUsers={setSpam} users={spam} toast={props.toast} usersPage={spamPage} setUsersPage={setSpamPage} id={props.store.id} />
              </div>
              <div className="modal-right" style={{ height: "48%" }}>
                <div className="app-main-right-header">
                  <span>{(Math.round(information.evaluateAverage * 100) / 100).toFixed(2)}</span>
                  <a href="#">التقييمات</a>
                </div>
                {eva.map((item, index) => {
                  return <Eva key={index} item={item} />;
                })}

                <LoadMoreEvas userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} setUsers={setSpam} users={eva} toast={props.toast} usersPage={evaPage} setUsersPage={setSpamPage} id={props.store.id} />
              </div>
            </div>
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PopupStore;
