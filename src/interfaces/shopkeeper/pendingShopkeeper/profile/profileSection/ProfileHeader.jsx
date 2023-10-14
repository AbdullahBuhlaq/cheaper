import jsonParse from "../../../../../functions/jsonParse";

function ProfileHeader(props) {
  try {
    return (
      <>
        <div className="profile-info-header">
          <div className="fix">
            <img src={props.avatar ? jsonParse(props.avatar)[0] : "images/user.webp"} />
            <div className="left-side">
              <h1 className="profileHeader-js">{props.storeInformation.information.nameStore}</h1>
              <p>العنوان : {props.storeInformation.information.locationText}</p>
            </div>
          </div>
          <div className="right-side">
            <span className="amount">التصنيف : {props.storeInformation.information["category.name"]}</span>
            <p>المدينة : {props.storeInformation.information["city"]}</p>
            <p>
              ساعات الافتتاح : من {props.storeInformation.information.fromHour} إلى {props.storeInformation.information.toHour}
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
