import { useState } from "react";
import handleSave from "../functions/handleSave";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
function Input(props) {
  const [isText, setIsText] = useState(false);
  try {
    return (
      <>
        <div className="column" style={{ position: "relative" }}>
          <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: "1.2" }}>
            {props.label}
          </motion.h3>
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ type: "spring", duration: "1.2" }}
            type={isText ? "text" : props.type}
            name={props.name}
            id={props.name}
            placeholder={props.placeholder}
            value={props.state[props.name]}
            onChange={async (event) => {
              const cursor = event.target.selectionStart;
              await handleSave(event, props.state, props.setState, props.errors, props.setErrors, props.schema);
              if (event.target.type == "text" || event.target.type == "password" || event.target.type == "tel") event.target.setSelectionRange(cursor, cursor);
            }}
            spellCheck="false"
            dir="rtl"
            disabled={props.disabled}
          />
          <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
          {props.type == "password" ? (
            <span
              style={{ position: "absolute", left: "15px", top: "42px", cursor: "pointer" }}
              onClick={() => {
                setIsText(!isText);
              }}
              className="eye"
            >
              {isText ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          ) : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Input;
