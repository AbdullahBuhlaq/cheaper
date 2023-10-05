import BillsArchive from "./BillsArchive";
import QRScanner from "./QRScanner";

function StoreRight(props) {
  try {
    return (
      <>
        <section className="profile-right-section">
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
