import { useEffect, useState } from "react";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";
import Map from "../../../../../components/Map";
import getAvater from "../../../../../functions/getAvater";

function ProfileLeft(props) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.className != "dropbtn") {
        setOpen(false);
      }
    });
  }, []);

  try {
    return (
      <>
        <div className="profile-left">
          <div className="modal-image-wrapper">
            <img
              src={
                props.storeInformation.information.avatar
                  ? getAvater(props.storeInformation.information.avatar)
                  : "images/user.webp"
              }
            />
          </div>
          <div className="main-header-titel">
            <h1 href="#">الصفحة الشخصية</h1>
            <div className="dropdown">
              <button
                onClick={() => {
                  setOpen(!open);
                }}
                className={"dropbtn"}
              >
                •••
              </button>

              <ul
                id="myDropdown"
                className={"dropdown-content" + (open ? " show" : "")}
              >
                <li>
                  <a href="#" onClick={() => props.setPopupStatus(4)}>
                    تعديل الملف الشخصي
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => props.setPopupStatus(5)}>
                    تعديل معلومات المحل
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => props.setPopupStatus(1)}>
                    تغيير البريد الإلكتروني
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => props.setPopupStatus(2)}>
                    تغيير كلمة السر
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => props.setPopupStatus(3)}>
                    تغيير رقم الهاتف
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <ProfileHeader
            avatar={props.profile.userInformation.avatar}
            storeInformation={props.storeInformation}
          />

          <ProfileDetails
            details={props.profile.userInformation}
            setPopupStatus={props.setPopupStatus}
          />

          <Map
            width={"100%"}
            height={"500"}
            lat={props.storeInformation.information.latitude}
            long={props.storeInformation.information.longitude}
          />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileLeft;
