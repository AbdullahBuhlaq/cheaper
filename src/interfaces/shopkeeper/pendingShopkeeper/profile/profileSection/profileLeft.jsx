import { useEffect, useState } from "react";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";
import jsonParse from "../../../../../functions/jsonParse";

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
            <img src={props.storeInformation.information.avatar ? jsonParse(props.storeInformation.information.avatar)[3] : "images/user.webp"} />
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

              <ul id="myDropdown" className={"dropdown-content" + (open ? " show" : "")}>
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

          <ProfileHeader avatar={props.profile.userInformation.avatar} storeInformation={props.storeInformation} />

          <ProfileDetails details={props.profile.userInformation} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileLeft;
