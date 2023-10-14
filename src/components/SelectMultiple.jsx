import { useEffect, useState } from "react";
import handleSave from "../functions/handleSave";
import { motion } from "framer-motion";

function SelectMultiple(props) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.tagName != "OPTION" && e.target.className != "open") {
        setOpen(false);
      }
    });
  }, []);

  try {
    return (
      <>
        <div className="column" style={{ position: "relative" }}>
          <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: "1.2" }}>
            {props.label}
          </motion.h3>
          <div style={{ position: "relative" }}>
            <motion.select initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 1 }} transition={{ type: "spring", duration: "1.2" }} className="my-listbox" defaultValue={"hello"} readonly disabled={true}>
              <option value="hello" style={{ display: "none" }}>
                {props.placeholder}
              </option>
            </motion.select>
            <div
              style={{ width: "100%", height: "45px", position: "absolute", top: "0px", zIndex: "20", right: 0 }}
              onClick={() => {
                setOpen(!open);
              }}
              className="open"
            ></div>
            {open ? (
              <motion.select
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ type: "spring", duration: "1.2" }}
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
                    await handleSave({ target: { name: props.name, value: newValue } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
                  }
                }}
                value={props.state[props.name]}
                disabled={props.disabled}
                multiple={true}
              >
                {Object.keys(props.list).map((listItem, listIndex) => {
                  return (
                    <option key={listIndex} value={props.list[listItem].id ? props.list[listItem].id : props.list[listItem].value}>
                      {props.list[listItem].name}
                    </option>
                  );
                })}
              </motion.select>
            ) : null}
          </div>

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

export default SelectMultiple;
