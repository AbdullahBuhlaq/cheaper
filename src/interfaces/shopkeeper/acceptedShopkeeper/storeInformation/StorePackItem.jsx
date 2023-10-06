import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { MdOutlineKeyboardDoubleArrowUp, MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import "./css/dropp.css";
import updateDiscount from "./functions/updateDiscount";
import disablePack from "./functions/disaplePack";
function StorePackItem(props) {
  const [open, setOpen] = useState(false);
  const [newDiscount, setNewDiscount] = useState(0);
  const [duringAdd, setDuringAdd] = useState(false);
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
        <div className="received-item-line">
          <div className="progress-line" style={{ marginRight: "5px" }}>
            <span className="time start">{new Date(props.item.createdAt).toLocaleDateString()}</span>
            <span className="time end">{new Date(new Date(props.item.createdAt).setDate(new Date(props.item.createdAt).getDate() + props.item["pack.duration"])).toLocaleDateString()}</span>
          </div>
          <div className="received-items-content">
            <div className="perfect-card-container" dir="ltr">
              <div className="perfect-card">
                <div className="perfect-card-right" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                  <div className="dropdown">
                    {!props.item.deletedAt ? (
                      <button
                        className="dropbtn"
                        onClick={() => {
                          setOpen(!open);
                        }}
                        // style={{ background: "var(--main-profile)", border: "none", marginLeft: "70px", letterSpacing: "1px", padding: "revert", fontWeight: "600" }}
                      >
                        •••
                      </button>
                    ) : null}
                    <ul id="myDropdown" className={"dropdown-content" + (open ? " show" : "")}>
                      <li style={{ width: "initial", height: "initial", borderRadius: "initial", margin: "initial", backgroundColor: "initial" }}>
                        <a
                          href="#"
                          onClick={() => {
                            disablePack(props.setStoreInformation, props.storeInformation, props.item.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
                          }}
                        >
                          إلغاء الباقة
                        </a>
                      </li>
                      {/* <li style={{ width: "initial", height: "initial", borderRadius: "initial", margin: "initial", backgroundColor: "initial" }}>
                        <a href="#">تغيير نسبة الحسم</a>
                      </li> */}
                    </ul>
                  </div>
                  <div style={{ display: "flex" }}>
                    {!props.item.deletedAt ? <MdOutlineKeyboardDoubleArrowUp style={{ color: "white", marginTop: "25%", cursor: "pointer" }} onClick={() => setNewDiscount(newDiscount + 1)} /> : null}
                    <CircularProgressbar
                      value={[props.item.discount + newDiscount]}
                      text={`${[props.item.discount + newDiscount]}%`}
                      styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",

                        // Text size
                        textSize: "20px",

                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,

                        pathColor: `rgba(62, 152, 199, ${(props.item.discount + newDiscount) / 100})`,
                        textColor: "#f88",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                    {!props.item.deletedAt ? <MdOutlineKeyboardDoubleArrowDown style={{ color: "white", marginTop: "25%", cursor: "pointer" }} onClick={() => setNewDiscount(newDiscount - 1)} /> : null}
                  </div>
                  {/* <FaArrowDown /> */}
                  {newDiscount ? (
                    duringAdd ? (
                      "جار الإرسال..."
                    ) : (
                      <div>
                        <span className="pack-options" onClick={() => updateDiscount(setDuringAdd, setNewDiscount, props.setStoreInformation, props.storeInformation, props.item.id, props.item.discount + newDiscount, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast)}>
                          حفظ
                        </span>{" "}
                        <span className="pack-options" onClick={() => setNewDiscount(0)}>
                          إلفاء
                        </span>
                      </div>
                    )
                  ) : (
                    "نسبة الحسم"
                  )}
                </div>
                <div className="perfect-card-left">
                  <div className="perfect-card-left-header">
                    <h1>اسم الباقة : {props.item["pack.name"]}</h1>
                    <h2>سعر الباقة :{props.item.cost}</h2>
                  </div>
                  <div className="perfect-card-left-body">
                    <h1>تم الشراء :{props.item.count.paid}</h1>
                    <h2>لم يتم الشراء :{props.item.count.notPaid}</h2>
                    <h3> المدة : {props.item["pack.duration"]} </h3>
                  </div>
                </div>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
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

export default StorePackItem;
