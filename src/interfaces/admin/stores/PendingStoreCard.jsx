import { SlSizeFullscreen } from "react-icons/sl";
import getIcon from "../../../functions/getIcon";

function PendingStoreCard(props) {
  try {
    return (
      <>
        <div className="sales-card">
          <div className="poster">
            <img src={props.store.avatar} />
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
              <span className="tag">{"التصنيف : " + props.store["category.name"] + " " + getIcon(props.store["category.emoji"])}</span>
            </div>
            <p className="desc"></p>
            <div className="cast"></div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PendingStoreCard;
