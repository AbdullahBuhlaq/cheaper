import { useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";

function StoreOptions(props) {
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
        <div className="main-header-titel">
          <h1 href="#" style={{ display: "flex" }}>
            الواجهة الرئيسية للمحل
            {props.userInformation.allRestrictions.action ? (
              <h1 style={{ color: "red", display: "flex" }}>
                {" (لقد تم حظرك لتجاوزك الحد الأدنى من الإبلاغات "}
                <h1 style={{ marginTop: "4px" }}>
                  <FcCancel />
                </h1>
                {" )"}
              </h1>
            ) : null}
          </h1>
          <div className="dropdown">
            <button
              className="dropbtn"
              onClick={() => {
                setOpenOptions(!openOptions);
              }}
            >
              •••
            </button>
            <ul id="myDropdown" className={"dropdown-content" + (openOptions ? " show" : "")}>
              <li>
                <a href="#" onClick={() => props.setOpenUpdate(true)}>
                  تعديل معلومات المحل
                </a>
              </li>
              <li>
                <a href="#" onClick={() => props.setOpenStatus(true)}>
                  تعديل الحالات
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreOptions;
