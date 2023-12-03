import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getUserProfile from "./function/getUserProfile";
import "./css/newuser.css";
import ProfileLeft from "./profileSection/profileLeft";
import ProfileBody from "./profileSection/ProfileBody";
import HeaderButton from "../../../components/mainArea";
import getUserOffer from "./function/getUserOffer";
import getUserStores from "./function/getUserStores";
import getUserChartFunction from "./function/getUserChart";
import Popup from "../../general/Popup";
import ProfileUserBlocks from "./profileSection/ProfileUserBlocks";
import UpdateUserProfile from "./profileSection/UpdateUserProfile";
import getGeneralCategories from "../../../functions/getGeneralCategories";
import Loading from "../../general/Loading";
import SecondLoading from "../../general/SecondLoading";
import deleteUserFunc2 from "./profileSection/function/deleteUser";
import { profileChart } from "./data/profleChart";
import StorePopup from "./profileSection/StorePopup";
import checkPermissions from "../../../functions/checkPermission";
import { FcCancel } from "react-icons/fc";

function UserProfile(props) {
  const params = useParams();
  const [userProfile, setUserProfile] = useState(-1);
  const [userChart, setUserChart] = useState(profileChart);
  const [userOffer, setUserOffer] = useState(-1);
  const [showBlocks, setShowBlocks] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openStore, setOpenStore] = useState(false);
  // const [userStores, setUserSto res] = useState(-1);
  const [usersPage, setUsersPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [filter, setFilter] = useState({ search: "", statePaid: -1, type: -1 });

  useEffect(() => {
    if (userProfile == -1 && checkPermissions(props.userInformation, ["admin.users.block.information"])) getUserProfile(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, params.id, setUserProfile, userProfile, props.toast);
    if (userChart.loading && checkPermissions(props.userInformation, ["admin.users.block.chartUser"])) getUserChartFunction(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, params.id, setUserChart, userChart, props.toast);
    if (props.categories == -1) getGeneralCategories(props.setCategories, props.toast);
    // if (userStores == -1) getUserStores(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, params.id, setUserStores, userStores, props.toast);
  }, []);

  useEffect(() => {
    if (userOffer == -1 && checkPermissions(props.userInformation, ["admin.users.block.offerUser"])) getUserOffer(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, params.id, setUserOffer, userOffer, props.toast, filter, { ...usersPage, page: 1, loadMore: true }, setUsersPage);
  }, [filter]);

  useEffect(() => {
    if (props.categories != -1 && userProfile != -1) setLoading(false);
  }, [props.categories, userProfile]);

  async function deleteUser(id) {
    deleteUserFunc2(id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, userProfile, setUserProfile, props.toast);
  }

  try {
    return (
      <>
        {checkPermissions(props.userInformation, ["admin.users.block.information"]) ? (
          !loading ? (
            <>
              <HeaderButton />

              <div className="main-profile">
                <ProfileLeft
                  setOpenStore={setOpenStore}
                  userChart={userChart}
                  offers={userOffer}
                  setUserOffer={setUserOffer}
                  deleteUser={deleteUser}
                  setCurrentEdit={setCurrentEdit}
                  setShowBlocks={setShowBlocks}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  filter={filter}
                  setFilter={setFilter}
                  usersPage={usersPage}
                  setUsersPage={setUsersPage}
                  userInformation={props.userInformation}
                  setUserInformation={props.setUserInformation}
                  refreshStatus={props.refreshStatus}
                  setRefreshStatus={props.setRefreshStatus}
                  navigate={props.navigate}
                  toast={props.toast}
                  id={params.id}
                />

                <ProfileBody userProfile={userProfile} />
              </div>

              {showBlocks ? (
                <>
                  <Popup
                    setOpen={setShowBlocks}
                    classes={"categories-main-modal"}
                    component={<ProfileUserBlocks blocks={props.blocks} setBlocks={props.setBlocks} setShowBlocks={setShowBlocks} currentShowBlocks={userProfile.information} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} navigate={props.navigate} toast={props.toast} />}
                  />
                </>
              ) : null}
              {currentEdit ? (
                <>
                  <Popup
                    setOpen={setCurrentEdit}
                    classes={"categories-main-modal"}
                    component={
                      <UpdateUserProfile
                        categories={props.categories}
                        userProfile={userProfile}
                        setUserProfile={setUserProfile}
                        currentEdit={userProfile.information}
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
              {openStore ? (
                <>
                  <Popup
                    setOpen={setOpenStore}
                    component={
                      <StorePopup name={userProfile.information.name} username={userProfile.information.username} userAvatar={userProfile.information.avatar} id={openStore} userId={userProfile.information.id} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />
                    }
                  />
                </>
              ) : null}
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
              <SecondLoading />
            </div>
          )
        ) : (
          <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <span style={{ fontSize: "80px" }}>
              <FcCancel />
            </span>
            <span>لا تملك صلاحية لعرض الصفحة الشخصية للمستخدم</span>
          </div>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserProfile;
