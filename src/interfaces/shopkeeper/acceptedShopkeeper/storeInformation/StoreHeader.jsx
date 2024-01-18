import { motion } from "framer-motion";
import { useState } from "react";
import jsonParse from "../../../../functions/jsonParse";
import deleteImage from "./functions/deleteImage";
import { storeImag } from "../../../../constants/story";
function StoreHeader(props) {
  const [heigth, setHeight] = useState(false);
  try {
    return (
      <>
        <div className="profile-info-header">
          <div className="fix">
            <motion.div className="profile-img-upload-section" onMouseEnter={() => setHeight(true)} onMouseLeave={() => setHeight(false)} style={{ position: "relative" }}>
              <img src={props.storeInformation.information.avatar ? jsonParse(props.storeInformation.information.avatar)[0] : storeImag} style={{ width: "110px", height: "110px", borderRadius: "11px", margin: "0 8px", objectFit: "cover" }} />
              <motion.div
                variants={{
                  hover: {
                    height: "100%",
                  },
                  initial: {
                    height: 0,
                  },
                }}
                animate={heigth ? "hover" : "initial"}
                style={{ display: "flex", flexDirection: "column", padding: "0 10px", justifyContent: "space-evenly", width: "88%", background: "linear-gradient(225deg, rgba(71, 204, 255, 0.3) 0%,  rgba(71, 204, 255, 0.3) 50% , rgba(255,121,0,0.3)  50%, rgba(255,121,0,0.3)  100%)", overflow: "hidden", position: "absolute", left: "7px", borderRadius: "10px" }}
              >
                <span
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => {
                    props.setOpenImage(true);
                  }}
                >
                  تعديل
                </span>
                <span
                  style={{ alignSelf: "end", cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => {
                    deleteImage(props.setStoreInformation, props.storeInformation, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
                  }}
                >
                  حذف
                </span>
              </motion.div>
            </motion.div>
            <div className="left-side">
              <h1 className="profileHeader-js">{props.storeInformation.information["nameStore"]}</h1>
              <p>العنوان : {props.storeInformation.information["locationText"]}</p>
            </div>
          </div>
          <div className="right-side">
            <span className="amount">التصنيف : {props.storeInformation.information["category.name"]}</span>
            <span className="amount">المدينة : {props.storeInformation.information["city"]}</span>
            <p>
              أوقات الافتتاح : من {props.storeInformation.information["fromHour"]} إلى {props.storeInformation.information["toHour"]}
            </p>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreHeader;
