import { userImag } from "../../../../../constants/story";
import getAvater from "../../../../../functions/getAvater";

function ProfileHeader(props) {
  try {
    return (
      <>
        <div className="profile-info-header">
          <div className="fix">
            <img
              src={props.avatar ? getAvater(props.avatar) : userImag}
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "11px",
                margin: "0 8px",
                objectFit: "cover",
              }}
            />
            <div className="left-side">
              <h1 className="profileHeader-js">
                {props.storeInformation.information.nameStore}
              </h1>
              <p>العنوان : {props.storeInformation.information.locationText}</p>
            </div>
          </div>
          <div className="right-side">
            <span className="amount">
              التصنيف : {props.storeInformation.information["category.name"]}
            </span>
            <p>المدينة : {props.storeInformation.information["city"]}</p>
            <p>
              ساعات الافتتاح : من {props.storeInformation.information.fromHour}{" "}
              إلى {props.storeInformation.information.toHour}
            </p>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileHeader;
