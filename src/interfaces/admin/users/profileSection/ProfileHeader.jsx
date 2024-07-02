import { userImag } from "../../../../constants/story";
import getAvater from "../../../../functions/getAvater";
import getIcon from "../../../../functions/getIcon";

function ProfileHeader(props) {
  try {
    return (
      <>
        <div className="profile-info-header">
          <div className="fix">
            <div className="profile-img-upload-section">
              <img
                src={
                  props.userProfile.information.avatar
                    ? getAvater(props.userProfile.information.avatar)
                    : userImag
                }
                style={{
                  minHeight: "110px",
                  maxHeight: "110px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="left-side">
              <h1 className="profileHeader-js">
                {props.userProfile.information.name}
              </h1>
              <p>
                الأصناف :
                {props.userProfile.category.map((cat, index) => {
                  return (
                    <span key={index}>
                      {cat.name + " "} {getIcon(cat.emoji)}{" "}
                      {index == props.userProfile.category.length - 1
                        ? ""
                        : " - "}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
          <div className="right-side">
            <span className="amount">
              الهدايا المرسلة : {props.userProfile.countGiftedForOtherUser}
            </span>
            <span className="amount">
              الهدايا المستلمة : {props.userProfile.countYourGift}
            </span>
            <span className="amount">
              العروض المتبقية لاستلام هدية : {props.userProfile.stillToGetGift}
            </span>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileHeader;
