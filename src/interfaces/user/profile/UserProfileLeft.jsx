import { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileDetails from "./UserProfileDetails";

function UserProfileLeft(props) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.className != "dropbtn") {
        setShow(false);
      }
    });
  }, []);

  try {
    return (
      <>
        <div className="profile-left">
          <div className="main-header-titel">
            <h1 href="#">الملف الشخصي </h1>
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => {
                  setShow(!show);
                }}
              >
                •••
              </button>
              <ul id="myDropdown" className={"dropdown-content" + (show ? " show" : "")}>
                <li>
                  <a href="#" onClick={() => props.setPopupStatus(1)}>
                    تغيير البريد الإلكتروني
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => props.setPopupStatus(2)}>
                    تغيير كلمة المرور
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => props.setPopupStatus(3)}>
                    تغيير رقم الهاتف
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => props.setPopupStatus(4)}>
                    تعديل الملف الشخصي
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => props.setPopupStatus(5)}>
                    عرض قائمة الحظورات
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <UserProfileHeader profile={props.profile} />

          <UserProfileDetails profile={props.profile} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserProfileLeft;
