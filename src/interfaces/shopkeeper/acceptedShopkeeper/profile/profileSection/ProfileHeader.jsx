import jsonParse from "../../../../../functions/jsonParse";

function ProfileHeader(props) {
  try {
    return (
      <>
        <div class="profile-info-header">
          <div className="fix">
            <div className="profile-img-upload-section">
              <img src={props.avatar ? jsonParse(props.avatar)[0] : "images/user.webp"} />
            </div>

            <h1 className="profileHeader-js" style={{ fontSize: "25px", marginTop: "37px" }}>
              {props.name}
            </h1>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileHeader;
