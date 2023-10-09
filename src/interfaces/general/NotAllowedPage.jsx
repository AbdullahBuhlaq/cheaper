import { FcCancel } from "react-icons/fc";

function NotAllowdPage(props) {
  try {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: "80px" }}>
            <FcCancel />
          </span>

          <span>{props.message ? props.message : <>لا تملك صلاحية لعرض هذه الصفحة</>}</span>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default NotAllowdPage;
