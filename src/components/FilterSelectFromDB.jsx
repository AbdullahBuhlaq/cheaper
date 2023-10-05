function FilterSelectFromDB(props) {
  try {
    return (
      <>
        <label>{props.label}</label>
        <select
          className="my-listbox"
          onChange={(event) => {
            props.state[props.name] = event.target.value;
            props.setState({ ...props.state });
          }}
          value={props.state[props.name]}
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

export default FilterSelectFromDB;
