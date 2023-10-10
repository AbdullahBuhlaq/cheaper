import { SlSizeFullscreen } from "react-icons/sl";
import getIcon from "../../../functions/getIcon";
import jsonParse from "../../../functions/jsonParse";
import { motion } from "framer-motion";

function PendingStoreCard(props) {
  try {
    return (
      <>
        <motion.div className="sales-card" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2" }}>
          <div className="poster">
            <img src={jsonParse(props.store.avatar)[3] ? jsonParse(props.store.avatar)[3] : jsonParse(props.store.avatar)[0]} />
          </div>
          <div className="details">
            <div className="sales-card-more-details">
              <h1>اسم المحل :{props.store.nameStore}</h1>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setCurrentEdit(props.store);
                  props.setCurrentEditType(2);
                }}
              >
                <SlSizeFullscreen />
              </span>
            </div>
            <h2>العنوان : {props.store.locationText}</h2>
            <div className="rating"></div>
            <div className="tags">
              <span className="tag">
                {"التصنيف : " + props.store["category.name"]}
                {getIcon(props.store["category.emoji"])}
              </span>
            </div>
            <p className="desc"></p>
            <div className="cast"></div>
          </div>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PendingStoreCard;
