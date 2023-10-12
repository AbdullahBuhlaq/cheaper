import { useState, Fragment, useEffect } from "react";
import * as faw from "react-icons/fc";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import handleSave from "../../../functions/handleSave";
import { motion } from "framer-motion";

function ChooseIcon(props) {
  const [iconSearch, setIconSearch] = useState("");
  function iconSearchHandle(event) {
    event.preventDefault();
    setIconSearch(event.target.value);
  }
  const [showIcons, setShowIcons] = useState(false);

  function getIcon() {
    const Cur = faw[props.state[props.name]];
    if (Cur) {
      return <Cur />;
    } else {
      return "";
    }
  }
  try {
    return (
      <>
        <label
          onClick={() => {
            setShowIcons(!showIcons);
          }}
          style={{ cursor: "pointer", display: "flex", alignItems: "end" }}
        >
          <span style={{ marginBottom: "5px" }}>{props.label}</span>
          <span style={{ margin: "0 5px 0 15px", marginTop: "10px" }}>{showIcons ? <FaAngleUp /> : <FaAngleDown />}</span>
          <span style={{ fontSize: "25px" }}>{props.state[props.name] ? getIcon() : null}</span>
        </label>
        <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
        {showIcons ? (
          <>
            <motion.div style={{ position: "relative", maxHeight: "33vh", overflow: "auto" }} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, originY: "-10%", opacity: 1 }} transition={{ duration: 0.5 }}>
              <input
                type="text"
                value={iconSearch}
                onChange={(event) => {
                  iconSearchHandle(event);
                }}
                style={{ width: "50%", position: "sticky", top: 0 }}
                placeholder="بحث..."
              />

              <div style={{ display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                {Object.keys(faw).map((item, index) => {
                  if (item.toLowerCase().includes(iconSearch.toLowerCase()) || iconSearch == "") {
                    const Icon = faw[item];
                    return (
                      <Fragment key={index}>
                        <motion.div
                          whileHover={{ scale: "1.1", transition: { type: "spring", duration: 1.2 } }}
                          onClick={async () => {
                            await handleSave({ target: { name: props.name, value: item } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
                          }}
                          style={{ color: "#081f48", cursor: "pointer", width: "70px", height: "70px", fontSize: "60px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255, 255, 255, .7)", margin: "5px 3px", borderRadius: "15px" }}
                        >
                          <Icon />
                        </motion.div>
                      </Fragment>
                    );
                  }
                })}
              </div>
            </motion.div>
          </>
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ChooseIcon;
