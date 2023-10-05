import { useEffect, useState } from "react";

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
                <a href="#" onClick={() => props.setOpenBlocks(true)}>
                  عرض قائمة الحظورات
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
