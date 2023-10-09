import { useEffect, useState } from "react";
import checkPermissions from "../../../functions/checkPermission";

function ProfileOptions(props) {
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
          <h1 href="#">واجهة محل {props.name}</h1>
          <div className="dropdown">
            {checkPermissions(props.userInformation, ["admin.store.accepted.block", "admin.store.accepted.unblock", "admin.store.accepted.deleteBlock", "admin.store.accepted.allBlock"]) ? (
              <button
                className="dropbtn"
                onClick={() => {
                  setOpenOptions(!openOptions);
                }}
              >
                •••
              </button>
            ) : null}
            <ul id="myDropdown" className={"dropdown-content" + (openOptions ? " show" : "")}>
              <li>
                <a href="#" onClick={() => props.setOpenBlocks(true)}>
                  عرض سجل الحظر
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

export default ProfileOptions;
