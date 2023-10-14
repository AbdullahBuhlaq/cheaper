import "./css/storePopup.css";
import getIcon from "../../../functions/getIcon";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import jsonParse from "../../../functions/jsonParse";
import checkPermissions from "../../../functions/checkPermission";

function PopupPendingStore(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const [storeInformation, setStoreInformation] = useState(-1);
  const [openOptions, setOpenOptions] = useState(false);

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
        <div className="modal-left">
          <div className="modal-image-wrapper">
            <img src={jsonParse(props.store.avatar)[3] ? jsonParse(props.store.avatar)[3] : jsonParse(props.store.avatar)[0]} />
          </div>
          <div className="modal-info-header">
            <div style={{ display: "flex" }}>
              <img src={props.store["user.avatar"] ? jsonParse(props.store["user.avatar"])[2] : "images/user.webp"} style={{ width: "109px", height: "auto", borderRadius: "11px", margin: "0 8px" }} />
              <div className="left-side">
                <div>
                  <h1 className="modalHeader-js">{props.store["user.name"]}</h1>
                  <h1 className="modalHeader-js" style={{ fontSize: "15px", opacity: "0.8" }}>
                    {props.store["user.username"]}@
                  </h1>
                </div>
                <p>العنوان : {props.store.locationText}</p>
              </div>
            </div>

            <div className="right-side">
              <div className="dropdown">
                {checkPermissions(props.userInformation, ["admin.store.accept", "admin.store.disable"]) ? (
                  <button onClick={() => setOpenOptions(!openOptions)} className="dropbtn">
                    •••
                  </button>
                ) : null}
                <ul id="myDropdown" className={"dropdown-content" + (openOptions ? " show" : "")}>
                  {checkPermissions(props.userInformation, ["admin.store.accept"]) ? (
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          props.acceptNewStore(props.store.id);
                        }}
                      >
                        قبول
                      </a>
                    </li>
                  ) : null}
                  {checkPermissions(props.userInformation, ["admin.store.disable"]) ? (
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          props.deleteNewStore(props.store.id);
                        }}
                      >
                        حذف
                      </a>
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
              <span>الرقم : {props.store["user.phoneNumber"]}</span>
            </div>

            <div className="info-wrapper">
              <div className="info-icon">
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                </svg>
              </div>
              <span>وقت الافتتاح : {props.store.fromHour}</span>
            </div>
            <div className="info-wrapper">
              <div className="info-icon">
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span>وقت الاغلاق : {props.store.toHour}</span>
            </div>
            <div className="info-wrapper">
              <div className="info-icon">
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span>
                التصنيف : {props.store["category.name"]} {getIcon(props.store["category.emoji"])}
              </span>
            </div>
          </div>
          <div className="desc-wrapper">
            <div className="modal-info-header"></div>
            {/* <div className="desc-actions">
              <button
                className="btn-book"
                onClick={() => {
                  props.deleteNewStore(props.store.id);
                }}
              >
                حذف
              </button>
              <button
                className="btn-book"
                onClick={() => {
                  props.acceptNewStore(props.store.id);
                }}
              >
                قبول
              </button>
            </div> */}
            <div className="map">
              {isLoaded ? (
                <>
                  <GoogleMap zoom={10} center={{ lat: 44, lng: -80 }} mapContainerClassName="map-container" />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PopupPendingStore;
