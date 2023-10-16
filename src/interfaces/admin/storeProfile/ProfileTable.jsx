import LoadMoreStoreUsers from "./LoadMoreStoreUsers";
import ProfileTableItem from "./ProfileTbleItem";

function ProfileTable(props) {
  try {
    return (
      <>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>اسم المستخدم</th>
                <th>نسبة الحسم</th>
                <th>تاريخ الاكتساب</th>
                <th>تاريخ الاستلام</th>
                <th>النوع</th>
                <th>التقييم</th>
                <th>الإبلاغ</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {props.users.map((item, index) => {
                return <ProfileTableItem key={index} item={item} toast={props.toast} />;
              })}
            </tbody>
            <LoadMoreStoreUsers userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} setUsers={props.setUsers} users={props.users} toast={props.toast} usersPage={props.usersPage} setUsersPage={props.setUsersPage} id={props.id} />
          </table>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileTable;
