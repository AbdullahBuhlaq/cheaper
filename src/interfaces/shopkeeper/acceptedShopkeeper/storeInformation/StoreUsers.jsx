import LoadMoreStoreUsers from "./LoadMoreStoreUsers";
import StoreUserItem from "./StoreUserItem";

function StoreUsers(props) {
  try {
    return (
      <>
        <div className="table-wrapper" style={{ maxHeight: "500px" }}>
          <table>
            <thead>
              <tr>
                <th>اسم المستخدم</th>
                <th>نسبة الحسم</th>
                <th>تاريخ الاكتساب</th>
                <th>تاريخ الاستلام</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {props.users.map((item, index) => {
                return <StoreUserItem key={index} item={item} />;
              })}
            </tbody>
            <LoadMoreStoreUsers userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} setUsers={props.setUsers} users={props.users} toast={props.toast} usersPage={props.usersPage} setUsersPage={props.setUsersPage} />
          </table>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreUsers;
