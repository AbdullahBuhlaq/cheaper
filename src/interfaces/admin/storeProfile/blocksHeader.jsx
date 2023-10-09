import checkPermissions from "../../../functions/checkPermission";
import Loading from "../../general/Loading";

function BlocksHeaderStore(props) {
  try {
    return (
      <>
        {checkPermissions(props.userInformation, ["admin.users.block.allBlockForUser"]) ? (
          <div className="categories-main-modal-body-details">
            {props.blocks ? (
              <h1>حالة الحظر: {props.blocked ? "محظور" : "غير محظور"}</h1>
            ) : (
              <span style={{ display: "flex", width: "50px", height: "auto", marginRight: "25px" }}>
                <Loading />
              </span>
            )}
            {props.blocks ? (
              <h2>عدد الحظورات: {props.count}</h2>
            ) : (
              <div style={{ display: "flex", width: "50px", height: "auto" }}>
                <Loading />
              </div>
            )}
          </div>
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BlocksHeaderStore;
