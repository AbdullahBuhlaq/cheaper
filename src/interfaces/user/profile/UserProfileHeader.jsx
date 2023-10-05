import getIcon from "../../../functions/getIcon";
import jsonParse from "../../../functions/jsonParse";

function UserProfileHeader(props) {
  try {
    return (
      <>
        <div className="profile-info-header">
          <div className="fix">
            <div className="profile-img-upload-section">
              <img src={props.profile.userInformation.avatar ? jsonParse(props.profile.userInformation.avatar)[3] : "../images/user.webp"} />
            </div>
            <div className="left-side">
              <h1 className="profileHeader-js">{props.profile.userInformation.name}</h1>
              <p>
                الأصناف :
                {props.profile.category.map((cat, index) => {
                  return (
                    <span key={index}>
                      {cat.name + " "} {getIcon(cat.emoji)} {index == props.profile.category.length - 1 ? "" : " - "}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
          <div className="right-side">
            {/* <span className="amount">الهدايا المرسلة : {props.profile.userInformation.countGiftedForOtherUser}</span>
            <span className="amount">الهدايا المستلمة : {props.profile.userInformation.countYourGift}</span>
            <span className="amount">العروض المتبقية لاستلام هدية : {props.profile.userInformation.stillToGetGift}</span> */}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserProfileHeader;
