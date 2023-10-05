function ProfileCardForStore(props) {
  try {
    return (
      <>
        <div className="details-profile-card">
          <div className="details-profile-card-header">
            <h1>{props.title}</h1>
          </div>

          <div className="details-profile-card-body">
            <div className="details-profile-card-body-icon">
              <i className="material-icons">{props.icon}</i>
            </div>
            <input type="text" value={props.value} readOnly />
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileCardForStore;
