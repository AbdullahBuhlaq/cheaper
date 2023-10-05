function StoreTab(props) {
  try {
    return (
      <>
        <button
          className={"tablinks" + (props.currentTab == props.tabNumber ? " active" : "")}
          onClick={() => {
            props.setCurrentTab(props.tabNumber);
          }}
          style={{ margin: 0 }}
        >
          {props.tabName}
        </button>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreTab;
