import { defaultStory } from "../../../constants/story";
import jsonParse from "../../../functions/jsonParse";

function RightRecentVisited(props) {
  try {
    return (
      <>
        {console.log(props.item)}
        <div className="received-item-line">
          <div className="progress-line">
            <span className="time start">{new Date(props.item.dateTake).toLocaleDateString()} </span>
            <span className="time end">{new Date(new Date(props.item.dateTake).setDate(new Date(props.item.dateTake).getDate() + 2)).toLocaleDateString()} </span>
          </div>
          <div className="received-items-content">
            <div className="received-files">
              {props.item.story.map((story, index) => {
                return (
                  <div className="image-wrapper" key={index}>
                    <img src={jsonParse(story.avatar)[1]} alt="Marco Andrews" title="Marco Andrews" />
                  </div>
                );
              })}

              {Array.from(Array(3 - props.item.story.length).keys()).map((item, index) => {
                return (
                  <div className="image-wrapper" key={index}>
                    <img src={defaultStory[item]} alt="Marco Andrews" title="Marco Andrews" />
                  </div>
                );
              })}
            </div>
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
