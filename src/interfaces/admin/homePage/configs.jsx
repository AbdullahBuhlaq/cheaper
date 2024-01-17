import "./css/setting.css";
import checkPermissions from "../../../functions/checkPermission";
import { motion } from "framer-motion";

function Config(props) {
  const titles = ["أقل نسبة خصم مجاني", "أعلى نسبة خصم مجاني", "أقل نسبة خصم مدفوع", "أعلى نسبة خصم مدفوع", "عدد البطاقات التي سيتم فتحها لربح بطاقة مجانية", "عدد الباقات التي سيتم فتحها لربح باقة مجانية", "عدد الإبلاغات على محل معين ليتم إرسال إشعار تنبيه", "عدد البطاقات التي سيتم إهداؤها لنيل عرض جديد"];
  try {
    return (
      <>
        <div className="setting-values-section" style={{ height: "100%", overflow: "auto" }}>
          {Object.keys(props.configs).map((config, index) => {
            return (
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2", delay: 0.1 * index }} className="setting-values-card" key={index}>
                <h1 style={{ textAlign: "center" }}>{titles[index]}</h1>
                <h2>{props.configs[config]}</h2>
              </motion.div>
            );
          })}
          {checkPermissions(props.userInformation, ["admin.config.update"]) ? (
            <button
              onClick={() => {
                props.setCurrentEdit(props.configs);
              }}
            >
              تعديل
            </button>
          ) : null}
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Config;
