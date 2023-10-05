function DetailsCard(props) {
  try {
    return (
      <>
        <div className="details-profile-card">
          <div className="details-profile-card-header">
            <h1>{props.keyName}</h1>
          </div>

          <div className="details-profile-card-body">
            <div className="profile-details-icon">{props.icon}</div>
            <input type="text" value={props.value} disabled style={{ fontFamily: "Tajawal" }} readOnly />
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default DetailsCard;
