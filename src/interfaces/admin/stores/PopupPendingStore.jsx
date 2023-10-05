import "./css/storePopup.css";
import getIcon from "../../../functions/getIcon";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

function PopupPendingStore(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const [storeInformation, setStoreInformation] = useState(-1);
  const [openOptions, setOpenOptions] = useState(false);

  try {
    return (
      <>
        <div className="modal-left">
          <div className="modal-image-wrapper">
            <img src={props.store.avatar} />
          </div>
          <div className="modal-info-header">
            <div className="left-side">
              <h1 className="modalHeader-js">اسم مقدم العرض</h1>
              <p>العنوان : {props.store.locationText}</p>
            </div>
            <div class="right-side">
              <div class="dropdown">
                <button onClick={() => setOpenOptions(!openOptions)} class="dropbtn">
                  •••
                </button>
                <ul id="myDropdown" class={"dropdown-content" + (openOptions ? " show" : "")}>
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
              <span>الرقم : {"0983758374"}</span>
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
