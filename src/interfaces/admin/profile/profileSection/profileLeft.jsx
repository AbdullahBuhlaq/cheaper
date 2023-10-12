import { useEffect, useState } from "react";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";

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
                    تعديل
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

          <ProfileHeader profile={props.profile} />

          <ProfileDetails details={props.profile.userInformation} setPopupStatus={props.setPopupStatus} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileLeft;
