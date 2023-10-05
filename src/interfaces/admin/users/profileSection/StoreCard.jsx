import { defaultSecondStory } from "../../../../constants/story";
import getIcon from "../../../../functions/getIcon";
import "./css/storePopup.css";
import AutoSlidingImages from "./AutoSlider";

const style = {
  "::-webkit-slider-runnable-track": {
    backgroundColor: "red",
  },
};

function StoreCard(props) {
  try {
    return (
      <>
        <div className="modal-left">
          <div className="modal-image-wrapper">
            <AutoSlidingImages images={props.store.story.length ? props.store.story : defaultSecondStory} />
          </div>
          <div className="modal-info-header">
            <div style={{ display: "flex" }}>
              <img src={props.store.avatar ? props.store.avatar : "../images/user.webp"} style={{ width: "109px", height: "auto", borderRadius: "11px", margin: "0 8px" }} />
              <div className="left-side" style={{ justifyContent: "space-evenly" }}>
                <h1 className="modalHeader-js">{props.store.name}</h1>
                <p>{props.store.locationText}</p>
              </div>
            </div>
            <div className="right-side">
              <span className="amount">التصنيف : {props.store.category.name + " " + getIcon(props.store.category.emoji)}</span>
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
              <span>المدينة : {props.store.city}</span>
            </div>
            <div className="info-wrapper">
              <div className="info-icon">
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                </svg>
              </div>
              <span>بعيد X متر عنك</span>
            </div>
            <div className="info-wrapper">
              <div className="info-icon">
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                </svg>
              </div>
              <span>وقت الافتتاح {props.store.fromHour}</span>
            </div>
            <div className="info-wrapper">
              <div className="info-icon">
                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <span>وقت الاغلاق {props.store.toHour}</span>
            </div>
          </div>
          <div className="desc-wrapper">
            <div className="modal-info-header"></div>
            <div className="desc-actions">
              <div className="add-favourite">
                <input type="checkbox" id="favourite" />
                <label htmlFor="favourite">
                  <span className="favourite-icon"></span>
                  <span>إذا بدنا نحط خريطة الوصول ↓</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-right">
          <div className="app-main-right-header">
            <a href="#">التعليق</a>
          </div>
          <div className="card-wrapper">
            <div className="card">
              <div className="profile-info-wrapper">
                <div className="profile-img-wrapper">
                  <img src={props.userAvatar ? props.userAvatar : "../images/user.webp"} alt="Review" />
                </div>

                <p>{props.userName}</p>
              </div>
              <p>{props.store.reasonSpam}</p>
            </div>
          </div>
          <div className="app-main-right-header">
            <a href="#">التقييم</a>
          </div>
          <div class="card-wrapper">
            <div class="card">
              <div class="profile-info-wrapper">
                <div class="fix-profile-image-wrapper">
                  <div class="profile-img-wrapper">
                    <img src={props.userAvatar ? props.userAvatar : "../images/user.webp"} alt="Review" />
                  </div>
                  <div class="profile-info-wrapper-name">
                    <h1></h1>
                    <p>{props.userName}</p>
                  </div>
                </div>
                <div class="profile-info-wrapper-date" style={{ marginRight: "auto" }}>
                  {/* <p>2023/09/12</p> */}
                </div>
              </div>
              <div class="profile-rates-area">
                <input className="range" type="range" min="0" max="100" value={props.store.evaluate} onmousemove="rangevalue1.value=value" style={style} />
                <div style={{ marginRight: props.store.evaluate - props.store.evaluate / 20 + "%" }}>
                  <span>{props.store.evaluate}</span>
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
