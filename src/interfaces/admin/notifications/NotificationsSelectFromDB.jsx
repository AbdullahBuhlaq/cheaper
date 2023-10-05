function NotificationsSelectFromDB(props) {
  try {
    return (
      <>
        <div className="column">
          <h3>{props.label}</h3>
          <select
            className="my-listbox"
            onChange={() => {}}
            onClick={async (event) => {
              if (event.target.value) {
                props.setState({ ...props.state, [props.name]: event.target.value });
              }
            }}
            value={props.state[props.name]}
            disabled={props.disabled}
          >
            <option value={-1}>{"أيا يكن"}</option>
            {Object.keys(props.list).map((listItem, listIndex) => {
              return (
                <option key={listIndex} value={props.list[listItem][props.valueKey]}>
                  {props.list[listItem][props.showKey]}
                </option>
              );
            })}
          </select>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default NotificationsSelectFromDB;
