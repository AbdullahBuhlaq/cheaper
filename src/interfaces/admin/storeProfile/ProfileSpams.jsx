import checkPermissions from "../../../functions/checkPermission";
import NotAllowdPage from "../../general/NotAllowedPage";
import LoadMoreSpamsProfile from "./LoadMoreSpamsProfile";
import SpamItem from "./SpamItem";

function ProfileSpams(props) {
  try {
    return (
      <>
        <div className="profile-right-reports">
          {checkPermissions(props.userInformation, ["admin.store.accepted.evaluationAndSpam"]) ? (
            <>
              <div className="app-main-right-header">
                <span>{props.total}</span>
                <a href="#">التعليقات</a>
              </div>
              {props.spam.map((item, index) => {
                return <SpamItem key={index} item={item} />;
              })}
              <LoadMoreSpamsProfile userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} setUsers={props.setSpam} users={props.spam} toast={props.toast} usersPage={props.spamPage} setUsersPage={props.setSpamPage} id={props.id} />
            </>
          ) : (
            <NotAllowdPage />
          )}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileSpams;
