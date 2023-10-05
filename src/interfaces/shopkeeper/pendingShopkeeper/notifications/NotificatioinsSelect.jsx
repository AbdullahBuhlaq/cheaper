function NotificationsSelect(props) {
  try {
    return (
      <>
        <div className="column">
          <h3>{props.label}</h3>
          <select
            className="my-listbox"
            onChange={async (event) => {
              props.setState({ ...props.state, [props.name]: event.target.value });
            }}
            value={props.state[props.name]}
            disabled={props.disabled}
          >
            {props.req ? null : <option value={-1}>{"أيا يكن"}</option>}
            {Object.keys(props.list).map((listItem, listIndex) => {
              return (
                <option key={listIndex} value={props.list[listItem].value}>
                  {props.list[listItem].name}
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

export default NotificationsSelect;
