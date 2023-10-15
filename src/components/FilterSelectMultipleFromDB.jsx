import { useEffect, useState } from "react";

function FilterSelectMultipleFromDB(props) {
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
        <label>{props.label}</label>
        <div style={{ position: "relative" }}>
          <select className="my-listbox" style={{ opacity: 1, backgroundImage: "none" }} defaultValue={"hello"} readonly disabled={true}>
            <option value="hello" style={{ display: "none" }}>
              {props.state[props.name].length ? "تم اختيار " + props.state[props.name].length + " عنصر" : props.placeholder}
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
              style={{ backgroundImage: "none" }}
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
              {Object.keys(props.list).map((listItem, listIndex) => {
                return (
                  <option key={listIndex} value={props.list[listItem][props.valueKey]}>
                    {props.list[listItem][props.nameKey]}
                  </option>
                );
              })}
            </select>
          ) : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default FilterSelectMultipleFromDB;
