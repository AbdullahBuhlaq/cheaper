import jsonParse from "../../../../../functions/jsonParse";

function ProfileHeader(props) {
  try {
    return (
      <>
        <div className="profile-info-header">
          <div className="fix">
            <div className="profile-img-upload-section">
              <img src={props.profile.userInformation.avatar ? jsonParse(props.profile.userInformation.avatar)[0] : "images/user.webp"} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "end" }}>
              <h1 className="profileHeader-js" style={{ fontSize: "25px" }}>
                {props.profile.userInformation.name}
              </h1>
              <h1 className="profileHeader-js" style={{ fontSize: "20px", opacity: "0.8" }}>
                {props.profile.userInformation.username}@
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileHeader;
