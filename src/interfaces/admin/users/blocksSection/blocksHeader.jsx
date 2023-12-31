import checkPermissions from "../../../../functions/checkPermission";
import Loading from "../../../general/Loading";
import SecondLoading from "../../../general/SecondLoading";

function BlocksHeader(props) {
  try {
    return (
      <>
        {checkPermissions(props.userInformation, ["admin.store.accepted.allBlock"]) ? (
          <div className="categories-main-modal-body-details">
            {props.userBlocks ? (
              <h1>حالة الحظر: {props.blocked ? "محظور" : "غير محظور"}</h1>
            ) : (
              <span style={{ display: "flex", width: "50px", height: "auto", marginRight: "25px" }}>
                <SecondLoading />
              </span>
            )}
            {props.userBlocks ? (
              <h2>عدد الحظورات: {props.count}</h2>
            ) : (
              <div style={{ display: "flex", width: "50px", height: "auto" }}>
                <SecondLoading />
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

export default BlocksHeader;
