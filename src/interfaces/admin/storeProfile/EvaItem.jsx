import { userImag } from "../../../constants/story";
import getAvater from "../../../functions/getAvater";

function EvaItem(props) {
  try {
    return (
      <>
        <div className="card-wrapper">
          <div className="card">
            <div className="profile-info-wrapper">
              <div className="fix-profile-image-wrapper">
                <div className="profile-img-wrapper">
                  <img
                    src={
                      props.item.avatar
                        ? getAvater(props.item.avatar)
                        : userImag
                    }
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="profile-info-wrapper-name">
                  <h1>{props.item["user.name"]}</h1>
                  <p>
                    {props.item["user.username"]
                      ? "@" + props.item["user.username"]
                      : null}
                  </p>
                </div>
              </div>
              <div className="profile-info-wrapper-date">
                <p>{new Date(props.item.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="profile-rates-area">
              <input
                className="range"
                type="range"
                min="0"
                max="100"
                value={props.item.evaluate}
                readOnly
              />
              <div
                style={{
                  marginRight:
                    props.item.evaluate - props.item.evaluate / 20 + "%",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    color: `rgba(${
                      255 - (255 * props.item.evaluate) / 100.0
                    } ,${0 + (255 * props.item.evaluate) / 100.0}, 0)`,
                  }}
                >
                  {props.item.evaluate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default EvaItem;
