import getIcon from "../../../../functions/getIcon";
import { motion } from "framer-motion";

function DetailsCard(props) {
  try {
    return (
      <>
        <motion.div className="details-profile-card" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2" }}>
          <div className="details-profile-card-header">
            <h1>
              {props.keyName}
              {props.verify ? (
                <>
                  {props.verify.state ? (
                    <span>{""}</span>
                  ) : (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        props.setPopupStatus(5);
                      }}
                    >
                      {"(قم بتأكيد البريد )"}
                    </span>
                  )}
                </>
              ) : null}
            </h1>
          </div>

          <div className="details-profile-card-body">
            <div className="profile-details-icon">{props.icon}</div>
            <input type="text" value={props.value} disabled style={{ fontFamily: "Tajawal" }} readOnly />
          </div>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default DetailsCard;
