import { userImag } from "../../../constants/story";
import getAvater from "../../../functions/getAvater";
import getIcon from "../../../functions/getIcon";

function UserProfileHeader(props) {
  try {
    return (
      <>
        <div className="profile-info-header">
          <div className="fix">
            <div className="profile-img-upload-section">
              <img
                src={
                  props.profile.userInformation.avatar
                    ? getAvater(props.profile.userInformation.avatar)
                    : userImag
                }
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "11px",
                  margin: "0 8px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="left-side">
              <h1 className="profileHeader-js">
                {props.profile.userInformation.name}
              </h1>
              <p>
                الأصناف :
                {props.profile.category.map((cat, index) => {
                  return (
                    <span key={index}>
                      {cat.name + " "} {getIcon(cat.emoji)}{" "}
                      {index == props.profile.category.length - 1 ? "" : " - "}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserProfileHeader;
