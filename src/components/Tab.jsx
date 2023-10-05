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
          {props.tab.icon}
        </NavLink>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Tab;
