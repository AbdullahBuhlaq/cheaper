import getIcon from "../../../functions/getIcon";
import jsonParse from "../../../functions/jsonParse";

function UserProfileHeader(props) {
  try {
    return (
      <>
        <div class="profile-info-header">
          <div class="fix">
            <div class="profile-img-upload-section">
              <img src={props.profile.userInformation.avatar ? jsonParse(props.profile.userInformation.avatar)[3] : "../images/user.webp"} style={{ minHeight: "110px", maxHeight: "110px" }} />
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
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserProfileHeader;
