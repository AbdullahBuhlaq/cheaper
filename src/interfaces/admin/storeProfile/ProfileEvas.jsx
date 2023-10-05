import EvaItem from "./EvaItem";
import LoadMoreEvasProfile from "./LoadMoreEvasProfile";

function ProfileEvas(props) {
  try {
    return (
      <>
        <div className="profile-right-reports">
          <div className="app-main-right-header">
            <span>{(Math.round(props.total * 100) / 100).toFixed(2)}</span>
            <a href="#">جميع التقييمات</a>
          </div>
          {props.eva.map((item, index) => {
            return <EvaItem key={index} item={item} />;
          })}
          <LoadMoreEvasProfile userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} setUsers={props.setEva} users={props.eva} toast={props.toast} usersPage={props.evaPage} setUsersPage={props.setEvaPage} id={props.id} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileEvas;
