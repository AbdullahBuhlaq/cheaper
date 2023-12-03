import ProfileEvas from "./ProfileEvas";
import ProfileSpams from "./ProfileSpams";
import { FaCircleXmark } from "react-icons/fa6";

function StoreProfileRight(props) {
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
          <ProfileEvas total={props.totalEva} eva={props.eva} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEva={props.setEva} evaPage={props.evaPage} setEvaPage={props.setEvaPage} id={props.id} />
          <ProfileSpams total={props.totalSpam} spam={props.spam} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setSpam={props.setSpam} spamPage={props.spamPage} setSpamPage={props.setSpamPage} id={props.id} />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreProfileRight;
