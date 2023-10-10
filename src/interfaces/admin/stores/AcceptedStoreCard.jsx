import { SlSizeFullscreen } from "react-icons/sl";
import getIcon from "../../../functions/getIcon";
import jsonParse from "../../../functions/jsonParse";
import { defaultStory } from "../../../constants/story";
import checkPermissions from "../../../functions/checkPermission";
import { motion } from "framer-motion";

function AcceptedStoreCard(props) {
  try {
    return (
      <>
        <motion.div className="sales-card" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2" }}>
          <div className="poster">
            <img src={jsonParse(props.store.avatar)[0]} alt="Location Unknown" />
          </div>
          <div className="details">
            <div className="sales-card-more-details">
              <h1>اسم المحل : {props.store.nameStore}</h1>
              {checkPermissions(props.userInformation, ["admin.store.accepted.info"]) ? (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    props.setCurrentEdit(props.store);
                    props.setCurrentEditType(1);
                  }}
                >
                  <SlSizeFullscreen />
                </span>
              ) : null}
            </div>
            <h2>العنوان : {props.store.locationText}</h2>

            <div className="rating">{/* <span>قيمة الحسم : 25%</span> */}</div>
            <div className="tags">
              <span className="tag">
                {"التصنيف : " + props.store["category.name"]} {getIcon(props.store["category.emoji"])}
              </span>
            </div>
            {props.store.deletedAt ? (
              <div className="tags">
                <span className="tag" style={{ borderColor: "red" }}>
                  {"محذوف في : " + new Date(props.store.deletedAt).toLocaleDateString()}
                </span>
              </div>
            ) : null}

            <p className="desc"></p>
            <div className="cast">
              <ul>
                {props.store.story.map((story, index) => {
                  return (
                    <li key={index}>
                      <img src={jsonParse(story.avatar)[1]} alt="Marco Andrews" title="Marco Andrews" />
                    </li>
                  );
                })}

                {Array.from(Array(3 - props.store.story.length).keys()).map((item, index) => {
                  return (
                    <li key={index}>
                      <img src={defaultStory[item]} alt="Marco Andrews" title="Marco Andrews" />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </motion.div>
        {/* <div onClick={() => props.setCurrentEdit(props.store)}>{props.store.nameStore}</div> */}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AcceptedStoreCard;
