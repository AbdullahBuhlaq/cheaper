import handleSave from "../functions/handleSave";
import { motion } from "framer-motion";

function SelectFromDB(props) {
  try {
    return (
      <>
        <div className="column" style={{ position: "relative" }}>
          <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: "1.2" }}>
            {props.label}
          </motion.h3>
          <motion.select
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ type: "spring", duration: "1.2" }}
            className="my-listbox"
            onChange={async (event) => {
              await handleSave({ target: { name: props.name, value: event.target.value } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
            }}
            value={props.state[props.name]}
            disabled={props.disabled}
          >
            <option value="">{props.placeholder}</option>
            {Object.keys(props.list).map((listItem, listIndex) => {
              if (props.type == "less5" && props.list[listItem].id <= 5) {
                return;
              } else if (props.type == "less1" && props.list[listItem].id <= 1) {
                return;
              }
              return (
                <option key={listIndex} value={props.list[listItem][props.valueKey]}>
                  {props.list[listItem][props.showKey]}
                </option>
              );
            })}
          </motion.select>
          {props.addNew ? (
            <span
              onClick={() => {
                props.addNew(true);
              }}
              className="add-new-in-form"
            >
              Add New +
            </span>
          ) : null}
          <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SelectFromDB;
