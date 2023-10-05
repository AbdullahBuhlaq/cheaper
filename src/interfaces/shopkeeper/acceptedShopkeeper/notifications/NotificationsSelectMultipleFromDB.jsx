function NotificationsSelectMultipleFromDB(props) {
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
                let newValue = [];
                let isExist = false;
                Promise.all(
                  props.state[props.name].map((item) => {
                    if (item != event.target.value) newValue = [...newValue, item];
                    else isExist = true;
                  })
                );
                if (!isExist) newValue = [...newValue, event.target.value];
                props.setState({ ...props.state, [props.name]: newValue });
              }
            }}
            value={props.state[props.name]}
            disabled={props.disabled}
            multiple={true}
          >
            <option value={[]}>{"أيا يكن"}</option>
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

export default NotificationsSelectMultipleFromDB;
