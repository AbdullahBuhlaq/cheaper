import jsonParse from "../../../functions/jsonParse";
import { defaultStory } from "../../../constants/story";
import { SlSizeFullscreen } from "react-icons/sl";
import { BsInfoCircle } from "react-icons/bs";
function OfferCard(props) {
  try {
    return (
      <>
        <div className="sales-card">
          <div className="poster">
            <img src={props.item.storeInfo.avatar ? jsonParse(props.item.storeInfo.avatar)[3] : "images/user.webp"} alt="Location Unknown" />
          </div>
          <div className="details">
            <div className="sales-card-more-details">
              <h1>{props.item.storeInfo.nameStore}</h1>
              <span
                style={{ cursor: "pointer", marginRight: "auto", marginLeft: "10px" }}
                onClick={() => {
                  props.setCurrentOffer(props.item);
                }}
              >
                <BsInfoCircle />
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.setOpenOffer(props.item);
                }}
              >
                <SlSizeFullscreen />
              </span>
            </div>
            <h2>العنوان : {props.item.storeInfo.locationText}</h2>
            <div className="rating">
              <span>قيمة الحسم : {props.item.discount}%</span>
            </div>
            <div className="tags">
              <span className="tag" style={props.item.state !== false ? { borderColor: "blue" } : props.item.dataTake ? {} : !props.item.QR ? { borderColor: "red" } : { borderColor: "orange" }}>
                {props.item.state !== false ? props.item.state : props.item.dataTake ? "تم استلام العرض" : !props.item.QR ? "لم يتم استلام العرض" : "ما زال العرض متاحا"}
              </span>
            </div>
            <p className="desc"></p>
            <div className="cast">
              <ul>
                {props.item.storeInfo.story.map((story, index) => {
                  return (
                    <li key={index}>
                      <img src={jsonParse(story.avatar)[1]} alt="Marco Andrews" title="Marco Andrews" />
                    </li>
                  );
                })}

                {Array.from(Array(3 - props.item.storeInfo.story.length).keys()).map((item, index) => {
                  return (
                    <li key={index}>
                      <img src={defaultStory[item]} alt="Marco Andrews" title="Marco Andrews" />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default OfferCard;
