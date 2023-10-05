import handleSave from "../functions/handleSave";

function CheckBox(props) {
  try {
    return (
      <>
        <div className="column" style={{ position: "relative", marginTop: "45px" }}>
          <input
            type="checkbox"
            className="task-item"
            value={props.state[props.name]}
            id={props.name}
            onChange={async (event) => {
              await handleSave({ target: { name: props.name, value: event.target.checked ? "مع صور حالات" : "بدون صور حالات" } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
            }}
            checked={props.state[props.name] == "مع صور حالات"}
          />
          <label htmlFor={props.name} style={{ paddingBottom: "16px" }}>
            <span className="label-text">{props.label}</span>
          </label>
          <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CheckBox;
