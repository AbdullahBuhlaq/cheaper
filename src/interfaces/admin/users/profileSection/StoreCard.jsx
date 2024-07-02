import {
  defaultSecondStory,
  storeImag,
  userImag,
} from "../../../../constants/story";
import getIcon from "../../../../functions/getIcon";
import "./css/storePopup.css";
import AutoSlidingImages from "./AutoSlider";
import { useEffect, useState } from "react";
import Map from "../../../../components/Map";
import getAvater from "../../../../functions/getAvater";

const style = {
  "::-webkit-slider-runnable-track": {
    backgroundColor: "red",
  },
};

function StoreCard(props) {
  const [story, setStory] = useState([]);
  async function getStory() {
    let newStory = [];

    await Promise.all(
      props.store.story.map((item) => {
        newStory = [...newStory, getAvater(item.avatar)];
      })
    );

    setStory(newStory);
  }
  useEffect(() => {
    if (props.store != -1) getStory();
  }, [props.store]);
  try {
    return (
      <>
        <div className="modal-left">
          <div className="modal-image-wrapper">
            <AutoSlidingImages
              images={props.store.story.length ? story : defaultSecondStory}
            />
          </div>
          <div className="modal-info-header">
            <div style={{ display: "flex" }}>
              <img
                src={
                  props.store.avatar ? getAvater(props.store.avatar) : storeImag
                }
                style={{
                  width: "110px",
                  height: "110px",
                  objectFit: "cover",
                  borderRadius: "11px",
                  margin: "0 8px",
                }}
              />
              <div
                className="left-side"
                style={{ justifyContent: "space-evenly" }}
              >
                <h1 className="modalHeader-js">{props.store.name}</h1>
                <p>{props.store.locationText}</p>
              </div>
            </div>
            <div className="right-side">
              <span className="amount"></span>
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
              <span>المدينة : {props.store.city}</span>
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
                التصنيف : {props.store.category.name}
                {getIcon(props.store.category.emoji)}
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                </svg>
              </div>
              <span>وقت الافتتاح {props.store.fromHour}</span>
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
              <span>وقت الاغلاق {props.store.toHour}</span>
            </div>
          </div>

          <div
            className="desc-wrapper"
            style={{ marginTop: "20px", marginLeft: "20px" }}
          >
            <Map
              width={"100%"}
              height={"500"}
              lat={props.store.latitude}
              long={props.store.longitude}
            />
          </div>
        </div>

        <div className="modal-right">
          <div className="app-main-right-header">
            <a href="#">الإبلاغ</a>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <div className="profile-info-wrapper">
                <div className="profile-img-wrapper">
                  <img
                    src={
                      props.userAvatar ? getAvater(props.userAvatar) : userImag
                    }
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  className="profile-info-wrapper-name"
                  style={{ marginRight: "10px" }}
                >
                  <p>{props.name}</p>
                  <p style={{ opacity: ".8" }}>{props.userName}@</p>
                </div>
              </div>
              <p>{props.store.reasonSpam}</p>
            </div>
          </div>
          <div className="app-main-right-header">
            <a href="#">التقييم</a>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <div className="profile-info-wrapper">
                <div className="fix-profile-image-wrapper">
                  <div className="profile-img-wrapper">
                    <img
                      src={
                        props.userAvatar
                          ? getAvater(props.userAvatar)
                          : userImag
                      }
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div
                    className="profile-info-wrapper-name"
                    style={{ marginRight: "10px" }}
                  >
                    <p>{props.name}</p>
                    <p style={{ opacity: ".8" }}>{props.userName}@</p>
                  </div>
                </div>
                <div
                  className="profile-info-wrapper-date"
                  style={{ marginRight: "auto" }}
                >
                  {/* <p>2023/09/12</p> */}
                </div>
              </div>
              <div className="profile-rates-area">
                <input
                  className="range"
                  type="range"
                  min="0"
                  max="100"
                  value={props.store.evaluate}
                  readOnly
                  style={style}
                />
                <div
                  style={{
                    marginRight:
                      props.store.evaluate - props.store.evaluate / 20 + "%",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      color: `rgba(${
                        255 - (255 * props.store.evaluate) / 100.0
                      } ,${0 + (255 * props.store.evaluate) / 100.0}, 0)`,
                    }}
                  >
                    {props.store.evaluate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreCard;
