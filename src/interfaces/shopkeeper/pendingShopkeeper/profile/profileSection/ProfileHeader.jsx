import jsonParse from "../../../../../functions/jsonParse";

function ProfileHeader(props) {
  try {
    return (
      <>
        <div class="profile-info-header">
          <div class="fix">
            <img src={props.avatar ? jsonParse(props.avatar)[0] : "images/user.webp"} />
            <div class="left-side">
              <h1 class="profileHeader-js">{props.storeInformation.information.nameStore}</h1>
              <p>العنوان : {props.storeInformation.information.locationText}</p>
            </div>
          </div>
          <div class="right-side">
            <span class="amount">التصنيف : {props.storeInformation.information["category.name"]}</span>
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
