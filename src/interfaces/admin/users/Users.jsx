import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import UserItem from "./UserItem";
import UpdateUser from "./UpdateUser";
import getUsers from "./function/getUsers";
import UserSearch from "./UserSearch";
import getUserStatistics from "./function/getUserStatistics";
import UserBlocks from "./UserBlocks";
import Popup from "../../general/Popup";
import getBlocks from "../blocks/functions/getBlocks";
import LoadMoreUsers from "./LoadMoreUsers";
import UserChart from "./UserChart";
import deleteUserFunc from "./function/deleteUser";
import getGeneralCategories from "../../../functions/getGeneralCategories";
import checkPermissions from "../../../functions/checkPermission";
import NotAllowdPage from "../../general/NotAllowedPage";

function Users(props) {
  const [loading, setLoading] = useState(true);
  const [loadingUsersStatisticsInfo, setLoadingUsersStatisticsInfo] = useState(true);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [currentShowBlocks, setCurrentShowBlocks] = useState(false);
  const [usersPage, setUsersPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [filter, setFilter] = useState({ search: "", gender: -1, blocked: -1, active: -1 });

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.users).map(async (userId, userIndex) => {
            const isTrue = true;
            //   const isTrue = await compare(searchOptions["roles"][props.search.field], props.search.operator, props.roles[role][props.search.field], props.search.word);
            if (isTrue) {
              return <UserItem key={userIndex} user={props.users[userId]} deleteUser={deleteUser} setCurrentEdit={setCurrentEdit} setCurrentShowBlocks={setCurrentShowBlocks} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />;
            }
          })
        );
        setItems([...newArr]);
      };

      populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [props.users, currentEdit, currentShowBlocks, filter]);

  useEffect(() => {
    if (!usersPage.loadingNow && checkPermissions(props.userInformation, ["admin.users.filterAndSearch"])) getUsers(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setUsers, props.users, props.toast, filter, { ...usersPage, page: 1, loadMore: true }, setUsersPage);
  }, [filter]);
  useEffect(() => {
    if (props.blocks == -1 && checkPermissions(props.userInformation, ["admin.block.all"])) getBlocks(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setBlocks, props.toast);
  }, []);
  useEffect(() => {
    if (props.categories == -1) getGeneralCategories(props.setCategories, props.toast);
  }, []);
  useEffect(() => {
    if (props.users != -1 && props.categories != -1) setLoading(false);
  }, [props.users, props.categories]);

  useEffect(() => {
    if ((props.usersBlockedChart.loading || props.usersGenderChart.loading || props.usersAgeChart.loading) && checkPermissions(props.userInformation, ["admin.users.statisticsInfo"]))
      getUserStatistics(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setUsersBlockedChart, props.usersBlockedChart, props.setUsersGenderChart, props.usersGenderChart, props.setUsersAgeChart, props.usersAgeChart, props.toast);
  }, []);
  useEffect(() => {
    if (!props.usersBlockedChart.loading && !props.usersGenderChart.loading && !props.usersAgeChart.loading) setLoadingUsersStatisticsInfo(false);
  }, [props.usersBlockedChart, props.usersGenderChart, props.usersAgeChart]);

  async function deleteUser(id) {
    deleteUserFunc(id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.users, props.setUsers, props.toast);
  }

  try {
    return checkPermissions(props.userInformation, ["admin.users.filterAndSearch"]) ? (
      <>
        {loading ? (
          <div className="profile-main-area">
            <Loading />
          </div>
        ) : (
          <>
            <div className="users-container">
              <div className="users-main-area">
                <div className="app-content">
                  <UserSearch filter={filter} setFilter={setFilter} usersPage={usersPage} setUsersPage={setUsersPage} />

                  <div className="products-area-wrapper tableView">
                    <div className="products-header">
                      <div className="product-cell image">الاسم</div>
                      <div className="product-cell category">اسم المستخدم</div>
                      <div className="product-cell price">الهاتف</div>
                      <div className="product-cell sales">الجنس</div>
                      <div className="product-cell stock">تاريخ الميلاد</div>
                      <div className="product-cell status-cell">حالة النشاط</div>
                      {checkPermissions(props.userInformation, ["admin.users.block.information", "admin.users.update", "admin.users.delete", "admin.users.block.allBlockForUser", "admin.users.block.deleteBlock", "admin.users.block.multiUnBlock", "admin.users.block.blockUser"]) ? <div className="product-cell option">خيارات</div> : null}
                    </div>

                    {items.map((item) => {
                      return item;
                    })}

                    <LoadMoreUsers userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} setUsers={props.setUsers} users={props.users} toast={props.toast} filter={filter} usersPage={usersPage} setUsersPage={setUsersPage} />
                  </div>

                  {currentEdit ? (
                    <>
                      <Popup
                        setOpen={setCurrentEdit}
                        classes={"form-popup"}
                        component={
                          <UpdateUser
                            categories={props.categories}
                            users={props.users}
                            setUsers={props.setUsers}
                            roles={props.roles}
                            currentEdit={props.users[currentEdit]}
                            setCurrentEdit={setCurrentEdit}
                            userInformation={props.userInformation}
                            setUserInformation={props.setUserInformation}
                            refreshStatus={props.refreshStatus}
                            setRefreshStatus={props.setRefreshStatus}
                            navigate={props.navigate}
                            toast={props.toast}
                          />
                        }
                      />
                    </>
                  ) : null}

                  {currentShowBlocks ? (
                    <>
                      <Popup
                        setOpen={setCurrentShowBlocks}
                        classes={"categories-main-modal"}
                        component={
                          <UserBlocks
                            usersBlockedChart={props.usersBlockedChart}
                            setUsersBlockedChart={props.setUsersBlockedChart}
                            users={props.users}
                            setUsers={props.setUsers}
                            blocks={props.blocks}
                            setCurrentShowBlocks={setCurrentShowBlocks}
                            currentShowBlocks={props.users[currentShowBlocks]}
                            userInformation={props.userInformation}
                            setUserInformation={props.setUserInformation}
                            refreshStatus={props.refreshStatus}
                            setRefreshStatus={props.setRefreshStatus}
                            navigate={props.navigate}
                            toast={props.toast}
                          />
                        }
                      />
                    </>
                  ) : null}
                </div>
              </div>
              {checkPermissions(props.userInformation, ["admin.users.statisticsInfo"]) ? (
                <div className="users-chart-container">
                  <UserChart chartData={props.usersAgeChart} />
                  <UserChart chartData={props.usersGenderChart} />
                  <UserChart chartData={props.usersBlockedChart} />
                </div>
              ) : null}
            </div>
          </>
        )}
      </>
    ) : (
      <NotAllowdPage />
    );
  } catch (error) {
    console.log(error);
  }
}

export default Users;
