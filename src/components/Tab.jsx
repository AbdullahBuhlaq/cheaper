import { NavLink } from "react-router-dom";

function Tab(props) {
  try {
    return (
      <>
        <NavLink
          to={"/" + props.tab.value}
          className={"item-link" + (props.currentTab == props.tab.value ? " active" : "")}
          onClick={() => {
            props.setCurrentTab(props.tab.value);
          }}
          style={{ fontSize: "25px", marginBottom: "25px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {props.tab.icon} <h1 style={{ fontSize: "15px" }}>{props.tab.name}</h1>
          </div>
        </NavLink>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Tab;
