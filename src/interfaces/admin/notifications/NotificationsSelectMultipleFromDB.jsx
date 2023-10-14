import { useEffect, useState } from "react";

function NotificationsSelectMultipleFromDB(props) {
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
        <div className="column">
          <h3>{props.label}</h3>
          <div style={{ position: "relative" }}>
            <select className="my-listbox" style={{ opacity: 1 }} defaultValue={"hello"} readonly disabled={true}>
              <option value="hello" style={{ display: "none" }}>
                {"اختر أصناف ..."}
              </option>
            </select>
            <div
              style={{ width: "100%", height: "45px", position: "absolute", top: "0px", zIndex: "20", right: 0 }}
              onClick={() => {
                setOpen(!open);
              }}
              className="open"
            ></div>
            {open ? (
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
                {Object.keys(props.list).map((listItem, listIndex) => {
                  return (
                    <option key={listIndex} value={props.list[listItem][props.valueKey]}>
                      {props.list[listItem][props.showKey]}
                    </option>
                  );
                })}
              </select>
            ) : null}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default NotificationsSelectMultipleFromDB;
