function RoleName(props) {
  try {
    return (
      <>
        <div
          className="role-card"
          onClick={() => {
            props.setCurrentEdit(props.role);
            props.setAddNew(false);
          }}
        >
          <div className="role-card-content">
            <div className="role-card-info-wrapper">
              <div className="role-card-info">
                <i className="fa-duotone fa-apartment"></i>
                <div className="role-card-info-title">
                  <h3>{props.role.name}</h3>
                </div>
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

export default RoleName;
