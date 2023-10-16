import jsonParse from "../../../functions/jsonParse";

function Eva(props) {
  try {
    return (
      <>
        <div className="card-wrapper">
          <div className="card">
            <div className="profile-info-wrapper">
              <div className="fix-profile-image-wrapper">
                <div className="profile-img-wrapper">
                  <img src={props.item.avatar ? jsonParse(props.item.avatar)[0] : "images/user.webp"} alt="Review" />
                </div>
                <div className="profile-info-wrapper-name" style={{ marginRight: "10px" }}>
                  <p>{props.item["user.name"]}</p>
                </div>
              </div>
              <div className="profile-info-wrapper-date" style={{ marginRight: "auto" }}>
                <p>{new Date(props.item.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="profile-rates-area">
              <input className="range" type="range" min="0" max="100" value={props.item.evaluate} readOnly />
              <div style={{ marginRight: props.item.evaluate - props.item.evaluate / 20 + "%" }}>
                <span style={{ fontWeight: "bold", color: `rgba(${255 - (255 * props.item.evaluate) / 100.0} ,${0 + (255 * props.item.evaluate) / 100.0}, 0)` }}>{props.item.evaluate}</span>
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

export default Eva;
