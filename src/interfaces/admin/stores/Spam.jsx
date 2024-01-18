import { userImag } from "../../../constants/story";
import jsonParse from "../../../functions/jsonParse";

function Spam(props) {
  try {
    return (
      <>
        <div className="card-wrapper">
          <div className="card">
            <div className="profile-info-wrapper">
              <div className="profile-img-wrapper">
                <img src={props.item.avatar ? jsonParse(props.item.avatar)[0] : userImag} style={{ width: "40px", height: "40px", objectFit: "cover" }} />
              </div>

              <p style={{ marginRight: "10px" }}>{props.item["user.name"]}</p>
              <div className="profile-info-wrapper-date" style={{ marginRight: "auto", fontSize: "10px" }}>
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

export default Spam;
