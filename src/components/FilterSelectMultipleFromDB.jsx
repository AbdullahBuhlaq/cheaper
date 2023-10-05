function FilterSelectMultipleFromDB(props) {
  try {
    return (
      <>
        <label>{props.label}</label>
        <select
          className="my-listbox"
          onClick={async (event) => {
            if (event.target.value != -1) {
              let newValue = [];
              let isExist = false;
              Promise.all(
                props.state[props.name].map((item) => {
                  if (item != event.target.value) newValue = [...newValue, item];
                  else isExist = true;
                })
              );
              if (!isExist) newValue = [...newValue, event.target.value];

              props.state[props.name] = newValue;
              props.setState({ ...props.state });
            }
          }}
          value={props.state[props.name]}
          multiple
        >
          <option value={-1}>{props.placeholder}</option>
          {Object.keys(props.list).map((listItem, listIndex) => {
            return (
              <option key={listIndex} value={props.list[listItem][props.valueKey]}>
                {props.list[listItem][props.nameKey]}
              </option>
            );
          })}
        </select>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default FilterSelectMultipleFromDB;
