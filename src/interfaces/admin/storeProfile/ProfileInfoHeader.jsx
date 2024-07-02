import { storeImag } from "../../../constants/story";
import getAvater from "../../../functions/getAvater";
import getIcon from "../../../functions/getIcon";

function ProfileInfoHeader(props) {
  try {
    return (
      <>
        <div className="profile-info-header">
          <div className="fix">
            <div className="profile-img-upload-section">
              <img
                src={
                  props.store.storeInfo["user.avatar"]
                    ? getAvater(props.store.storeInfo["user.avatar"])
                    : storeImag
                }
                style={{
                  width: "109px",
                  height: "109px",
                  borderRadius: "11px",
                  margin: "0 8px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="left-side">
              <h1 className="profileHeader-js">
                {props.store.storeInfo["user.name"]}
              </h1>
              <p>العنوان : {props.store.storeInfo.locationText}</p>
            </div>
          </div>
          <div className="right-side">
            <span className="amount">
              التصنيف : {props.store.storeInfo["category.name"]}{" "}
              {getIcon(props.store.storeInfo["category.emoji"])}
            </span>
            <p>
              أوقات الافتتاح : من {props.store.storeInfo.fromHour} إلى{" "}
              {props.store.storeInfo.toHour}
            </p>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileInfoHeader;
