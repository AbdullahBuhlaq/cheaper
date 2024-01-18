import { userImag } from "../../../constants/story";
import jsonParse from "../../../functions/jsonParse";

function SpamItem(props) {
  try {
    return (
      <>
        <div className="card-wrapper">
          <div className="card">
            <div className="profile-info-wrapper">
              <div className="fix-profile-image-wrapper">
                <div className="profile-img-wrapper">
                  <img src={props.item.avatar ? jsonParse(props.item.avatar)[0] : userImag} style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                </div>
                <div className="profile-info-wrapper-name">
                  <h1>{props.item["user.name"]}</h1>
                  <p>{props.item["user.username"] ? "@" + props.item["user.username"] : null}</p>
                </div>
              </div>
              <div className="profile-info-wrapper-date">
                <p>{new Date(props.item.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <p>{props.item.reasonSpam}</p>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SpamItem;
