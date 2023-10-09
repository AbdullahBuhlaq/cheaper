import getSystemIcon from "../../../functions/getSystemIcon";
import { motion } from "framer-motion";

function DeviceCard(props) {
  try {
    return (
      <>
        <motion.div className="advices-body" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", duration: "1.2", delay: 0.1 * props.index }}>
          <div className="advice">
            <h1>المتصفح المستخدم : {props.device.browser}</h1>
            <h1>الجهاز المستخدم : {props.device.device}</h1>
            <h1>
              نظام التشغيل : {props.device.system + " "}
              {getSystemIcon(props.device.system)}
            </h1>
            <h2>التاريخ : {new Date(props.device.logInDate).toLocaleString()}</h2>
          </div>
        </motion.div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default DeviceCard;
