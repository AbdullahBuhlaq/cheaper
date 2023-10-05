import UpdateConfigs from "./UpdateConfigs";
import Popup from "../../general/Popup";
import { useState } from "react";
import "./css/setting.css";

function Config(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const titles = ["أقل نسبة خصم مجاني", "أعلى نسبة خصم مجاني", "أقل نسبة خصم مدفوع", "أعلى نسبة خصم مدفوع", "عدد البطاقات التي سيتم فتحها لربح بطاقة مجانية", "عدد الباقات التي سيتم فتحها لربح باقة مجانية", "عدد الإبلاغات على محل معين ليتم إرسال إشعار تنبيه", "عدد البطاقات التي سيتم إهداؤها لنيل عرض جديد"];
  try {
    return (
      <>
        <div className="setting-values-section" style={{ height: "100%", overflow: "auto" }}>
          {Object.keys(props.configs).map((config, index) => {
            return (
              <div class="setting-values-card" key={index}>
                <h1 style={{ textAlign: "center" }}>{titles[index]}</h1>
                <h2>{props.configs[config]}</h2>
              </div>
            );
          })}
          <button
            onClick={() => {
              setCurrentEdit(props.configs);
            }}
          >
            تعديل
          </button>
        </div>

        {currentEdit ? (
          <>
            <Popup
              setOpen={setCurrentEdit}
              classes={"form-popup"}
              component={<UpdateConfigs configs={props.configs} setConfigs={props.setConfigs} currentEdit={props.configs} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} navigate={props.navigate} toast={props.toast} />}
            />
          </>
        ) : null}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Config;
