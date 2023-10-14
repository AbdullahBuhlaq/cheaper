import { useState, useEffect } from "react";
import "./css/sendNotifications.css";
import NotificationsSelect from "./NotificatioinsSelect";
import selectOptions from "../../../../constants/selectOptions";
import NotificationsSelectMultipleFromDB from "./NotificationsSelectMultipleFromDB";
import NotificationsSelectFromDB from "./NotificationsSelectFromDB";
import getGeneralCategories from "../../../../functions/getGeneralCategories";
import Loading from "../../../general/Loading";
import sendNotificationsFunc from "./functions/sendNotificationsFunc";

function SendNotifications(props) {
  const [type, setType] = useState({ type: "users" });
  const [forUser, setForUser] = useState({ gender: -1, active: -1, categories: [] });
  const [forShop, setForShop] = useState({ city: -1, subscribe: -1, categories: -1 });
  const [duringAdd, setDuringAdd] = useState(false);
  const [data, setData] = useState({ title: "", message: "" });

  useEffect(() => {
    if (props.categories == -1) getGeneralCategories(props.setCategories, props.toast);
  }, []);

  try {
    return (
      <>
        {props.categories == -1 ? (
          <Loading />
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <div className="notifications-options-container" style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                <form>
                  <div className="row">
                    <NotificationsSelect label={"نوع المستخدم : "} list={selectOptions.notificationsType} name={"type"} state={type} setState={setType} req={true} />
                    {type.type == "users" ? (
                      <>
                        <NotificationsSelect label={"الجنس : "} list={selectOptions.gender} name={"gender"} state={forUser} setState={setForUser} />
                        <NotificationsSelect label={"حالة النشاط : "} list={selectOptions.notificaitionActive} name={"active"} state={forUser} setState={setForUser} />
                        <NotificationsSelectMultipleFromDB label={"الصنف : "} list={props.categories} name={"categories"} state={forUser} setState={setForUser} valueKey={"name"} showKey={"name"} />
                      </>
                    ) : (
                      <>
                        <NotificationsSelect label={"المدينة : "} list={selectOptions.city} name={"city"} state={forUser} setState={setForUser} />
                        <NotificationsSelect label={"حالة الاشتراك : "} list={selectOptions.subscribe} name={"subscribe"} state={forShop} setState={setForShop} />
                        <NotificationsSelectFromDB label={"الصنف : "} list={props.categories} name={"categories"} state={forShop} setState={setForShop} valueKey={"name"} showKey={"name"} />
                      </>
                    )}
                  </div>
                </form>
              </div>

              <div className="mail-contents">
                <div className="mail">
                  <label htmlFor="subj">موضوع الإشعار :</label>
                  <input
                    type={"text"}
                    name={props.name}
                    id="subj"
                    className="mail-contents-title"
                    placeholder={props.placeholder}
                    value={data.title}
                    onChange={async (event) => {
                      const cursor = event.target.selectionStart;
                      setData({ ...data, title: event.target.value });
                      event.target.setSelectionRange(cursor, cursor);
                    }}
                    spellCheck="false"
                    dir="rtl"
                  />
                </div>
                <br />
                <div className="mail">
                  <label htmlFor="inside">نص الإشعار :</label>
                  <input
                    type={"text"}
                    name={props.name}
                    id="inside"
                    className="mail-inside"
                    placeholder={props.placeholder}
                    value={data.message}
                    onChange={async (event) => {
                      const cursor = event.target.selectionStart;
                      setData({ ...data, message: event.target.value });
                      event.target.setSelectionRange(cursor, cursor);
                    }}
                    spellCheck="false"
                    dir="rtl"
                  />
                </div>
                <form>
                  <button
                    className={"button"}
                    onClick={() => {
                      sendNotificationsFunc(data, type.type, type.type == "users" ? forUser : forShop, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAdd, props.toast);
                    }}
                    disabled={duringAdd}
                  >
                    <span className="default">إرسال</span>
                    <div className="left"></div>
                    <div className="right"></div>
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SendNotifications;
