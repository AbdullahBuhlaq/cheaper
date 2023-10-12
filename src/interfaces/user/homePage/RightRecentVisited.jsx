import { defaultStory } from "../../../constants/story";
import jsonParse from "../../../functions/jsonParse";
import { motion } from "framer-motion";

function RightRecentVisited(props) {
  try {
    return (
      <>
        <div className="received-item-line">
          <div className="progress-line">
            <span className="time start">{new Date(props.item.createdAt).toLocaleDateString()} </span>
            <span className="time end">{new Date(new Date(props.item.createdAt).setDate(new Date(props.item.createdAt).getDate() + 2)).toLocaleDateString()} </span>
          </div>
          <div className="received-items-content">
            <div className="received-files">
              {props.item.story.map((story, index) => {
                return (
                  <motion.div className="image-wrapper" key={index} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ ease: "linear", duration: "0.5" }}>
                    <img src={jsonParse(story.avatar)[1]} alt="Marco Andrews" title="Marco Andrews" />
                  </motion.div>
                );
              })}

              {Array.from(Array(3 - props.item.story.length).keys()).map((item, index) => {
                return (
                  <motion.div className="image-wrapper" key={index} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ ease: "linear", duration: "0.5" }}>
                    <img src={defaultStory[item]} alt="Marco Andrews" title="Marco Andrews" />
                  </motion.div>
                );
              })}
            </div>
            {console.log(props.item)}
            <div className="received-files-info">
              لقد قمت بزيارة <span className="info-purple">{props.item.namStore}</span> في تاريخ <span className="info-purple">{new Date(props.item.dateTake).toLocaleDateString()} </span>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default RightRecentVisited;
