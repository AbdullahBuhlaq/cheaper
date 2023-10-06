import { useEffect, useRef, useState } from "react";
import generalTabs from "../constants/generalTabs";
import requestOptions from "../constants/requestOptions";
import Tab from "./Tab";
import { TbBellRinging } from "react-icons/tb";
import "../css/notifications.css";
import NotificationItem from "./NotificationItem";
import LoadMoreNotifications from "./LoadMoreNotifications";
import refreshToken from "../functions/refreshToken";
import { BiSolidLeftArrow } from "react-icons/bi";

function Navbar(props) {
  async function logout(userInformation) {
    try {
      let response = await fetch(`${import.meta.env.VITE_URL}/auth/logout`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
      let data = await response.json();
      if (data.success) {
        localStorage.removeItem("userInformation");
        props.navigate("/login");
      } else {
        if (data.error == "jwt expired") {
          const status = await refreshToken(userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
          await logout({ ...userInformation, ...status });
        } else {
          console.log(data.error);
          props.toast.error(data.error, {
            position: props.toast.POSITION.TOP_CENTER,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const [show, setShow] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const ref = useRef();
  const [currentHeight, setCurrentHeight] = useState("2000");

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (ref.current) setCurrentHeight(ref.current.offsetHeight - 200);
    });

    resizeObserver.observe(document.getElementById("nav"));
  }, []);

  try {
    return (
      <>
        <div className="left-area" style={{ overflow: "visible" }} id="nav" ref={ref}>
          <div className="app-name">Cheaper</div>

          <a
            href="#"
            className="item-link"
            id="pageLink"
            onClick={(event) => {
              event.preventDefault();
              document.body.classList.toggle("dark");
              document.documentElement.classList.toggle("dark");
            }}
          >
            <button className="mode-switch active">
              <svg className="sun" fill="none" stroke="#fbb046" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <defs></defs>
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
              <svg className="moon" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <defs></defs>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
          </a>

          <a href="#" className="item-link" style={{ color: "#FFD700", fontSize: "25px", zIndex: "30", marginBottom: "25px" }}>
            {props.tabs.length ? (
              <>
                <div className={"menu-item highlight" + (showNotifications ? " show" : "")} style={{ zIndex: "30" }}>
                  <div className="menu-text" style={{ zIndex: "30" }} onClick={() => setShowNotifications(!showNotifications)}>
                    <TbBellRinging />
                  </div>
                  <div className={"sub-menu double" + (showNotifications ? " show" : "")} style={{ zIndex: "30" }}>
                    <div className="notifications-last-update">
                      {Object.keys(props.notifications).map((item, index) => {
                        return <NotificationItem key={index} item={props.notifications[item]} />;
                      })}
                      <LoadMoreNotifications
                        userInformation={props.userInformation}
                        setUserInformation={props.setUserInformation}
                        refreshStatus={props.refreshStatus}
                        setRefreshStatus={props.setRefreshStatus}
                        notifications={props.notifications}
                        setNotifications={props.setNotifications}
                        toast={props.toast}
                        notificationsPage={props.notificationsPage}
                        setNotificationsPage={props.setNotificationsPage}
                      />

                      {!props.pendingSendNotifications ? (
                        <div className="notifications-last-update-bottom-container">
                          <button
                            onClick={() => {
                              props.setOpenNotificationsSend(true);
                            }}
                          >
                            إرسال إشعارات
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </a>

          {props.tabs.map((tab, tabIndex) => {
            if (currentHeight / 100 >= tabIndex + 1) {
              return <Tab key={tabIndex} tab={tab} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} />;
            }
          })}
          {generalTabs.map((tab, tabIndex) => {
            if (currentHeight / 100 >= tabIndex + 1 + props.tabs.length) {
              return <Tab key={tabIndex} tab={tab} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} />;
            }
          })}
          {currentHeight / ((props.tabs.length + generalTabs.length) * 100) < 1 ? (
            <>
              <div className={"menu-item highlight" + (showMore ? " show" : "")} style={{ zIndex: "30" }}>
                <div
                  className="menu-text"
                  style={{ zIndex: "30", cursor: "pointer" }}
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  <BiSolidLeftArrow />
                </div>
                <div className={"sub-menu double" + (showMore ? " show" : "")} style={{ zIndex: "30", height: "320px", top: "-242px", overflow: "auto", minWidth: "initial", textAlign: "center" }}>
                  <div className="notifications-last-update">
                    {props.tabs.map((tab, tabIndex) => {
                      if (currentHeight / 100 < tabIndex + 1) {
                        return <Tab key={tabIndex} tab={tab} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} />;
                      }
                    })}
                    {generalTabs.map((tab, tabIndex) => {
                      if (currentHeight / 100 < tabIndex + 1 + props.tabs.length) {
                        return <Tab key={tabIndex} tab={tab} currentTab={props.currentTab} setCurrentTab={props.setCurrentTab} />;
                      }
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {props.tabs.length ? (
            <button className="btn-logout" onClick={() => logout(props.userInformation)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-log-out" viewBox="0 0 24 24">
                <defs></defs>
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"></path>
              </svg>
            </button>
          ) : (
            <li onClick={() => props.navigate("/login")}>
              <a style={{ color: "green", cursor: "pointer" }}>login</a>
            </li>
          )}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Navbar;
