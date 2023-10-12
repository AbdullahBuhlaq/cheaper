import validateForm from "../functions/validateForm";
import { motion } from "framer-motion";

function Button(props) {
  try {
    return (
      <>
        <button
          className={"button" + (props.classes ? " " + props.classes : "")}
          style={{ color: "white", opacity: props.disabled ? ".5" : "1" }}
          onClick={async (event) => {
            let isValid = true;
            if (!props.dontValid) {
              isValid = await validateForm(event, props.joiObject, props.state, props.setStateErrors);
            }
            isValid
              ? await props.action(event)
              : props.toast.info("يرجى إدخال البيانات كاملة بشكل صحيح!", {
                  position: props.toast.POSITION.TOP_CENTER,
                });
          }}
          disabled={props.disabled}
        >
          {props.disabled ? (
            <>
              <span className="default" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid white", borderTopColor: "transparent" }}></motion.div>
              </span>
            </>
          ) : (
            <span className="default">{props.text}</span>
          )}
          <div className="left"></div>
          <div className="right"></div>
        </button>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Button;
