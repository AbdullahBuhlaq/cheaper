function FilterSelect(props) {
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
          style={{ backgroundImage: "none" }}
        >
          {!props.noChoose ? <option value={-1}>{props.placeholder}</option> : null}
          {Object.keys(props.list).map((listItem, listIndex) => {
            return (
              <option key={listIndex} value={props.list[listItem].value}>
                {props.list[listItem].name}
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

export default FilterSelect;
