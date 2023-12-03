import BillsArchive from "./BillsArchive";
import QRScanner from "./QRScanner";
import { FaCircleXmark } from "react-icons/fa6";

function StoreRight(props) {
  try {
    return (
      <>
        <section className="new-right-area profile-right-section">
          <div
            className={"btn-close-right"}
            onClick={() => {
              document.getElementsByClassName("new-right-area")[0].classList.remove("show");
            }}
          >
            <FaCircleXmark />
          </div>
          <QRScanner userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />

          <BillsArchive />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreRight;
