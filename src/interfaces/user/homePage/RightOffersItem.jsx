import { useEffect, useState } from "react";
import getRemainingTime from "../../../functions/getRemainingTime";
import jsonParse from "../../../functions/jsonParse";
import { motion } from "framer-motion";

function RightOfferItem(props) {
  const [remainingTime, setRemainingTime] = useState("");
  const [remainingTimeWidth, setRemainingTimeWidth] = useState("");
  useEffect(() => {
    if (remainingTime == "") {
      setRemainingTime(getRemainingTime(172800000 - (new Date(new Date().toISOString()) - new Date(props.item.createdAt))));
      setRemainingTimeWidth(new Date(new Date().toISOString()) - new Date(props.item.createdAt));

      setInterval(() => {
        setRemainingTime(getRemainingTime(172800000 - (new Date(new Date().toISOString()) - new Date(props.item.createdAt))));
      }, 60000);
      setInterval(() => {
        setRemainingTimeWidth(new Date(new Date().toISOString()) - new Date(props.item.createdAt));
      }, 60000);
    }
  }, [props.item]);

  try {
    return (
      <>
        <motion.div className="download-item-line" style={{ overflow: "hidden" }} initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 1 }} transition={{ ease: "linear", delay: props.index * 0.1, duration: "0.5" }}>
          <div className="line-header">{new Date(props.item.createdAt).toLocaleDateString()}</div>
          <div className="download-area">
            <div className="download-item-icon" style={{ marginLeft: "10px" }}>
              <img src={props.item.store.avatar ? jsonParse(props.item.store.avatar)[1] : "images/user.webp"} alt="" style={{ width: "50px", height: "50px", borderRadius: "50%", marginLeft: "10px" }} />
            </div>
            <div className="download-item-texts">
              <p className="download-text-header">
                خصم {props.item.discount}% من محل {props.item.store.name}
              </p>
              {new Date(new Date().toISOString()) - new Date(props.item.createdAt) > 172800000 ? (
                <p className="download-text-info">
                  <span>انتهت صلاحية العرض</span>
                </p>
              ) : (
                <>
                  <p className="download-text-info">
                    <span>تبقى {remainingTime} حتى نفاذ العرض</span>
                  </p>
                  <div className="progress-bar">
                    <span className="progress" style={{ width: remainingTimeWidth / 1728000.0 + "%" }}></span>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default RightOfferItem;
