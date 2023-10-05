import { useEffect, useState } from "react";
import getNotifications from "../../functions/getNotifications";
import Navbar from "../../components/Navbar";
import { Route, Routes } from "react-router-dom";
import { adminTabs } from "../../constants/generalTabs";
import Loading from "../general/Loading";
import Profile from "./profile/Profile";
import Categories from "./categories/categories";
import Roles from "./roles/Roles";
import Blocks from "./blocks/Blocks";
import Packs from "./packs/Packs";
import Employees from "./employees/Employees";
import Main from "../general/Main";
import Home from "./homePage/home";
import Users from "./users/Users";
import { userChartData } from "./homePage/data/userChartData";
import { storeChartData } from "./homePage/data/storeChartData";
import { cartChartData } from "./homePage/data/cartChartData";
import { cityChartData } from "./homePage/data/cityChartData";
import UserProfile from "./users/UserProfile";
import { packsChartData } from "./packs/data/packsChartData";
import { usersAges } from "./users/data/usersAges";
import { usersGender } from "./users/data/usersGender";
import { usersBlocked } from "./users/data/usersBlocked";
import Stores from "./stores/Stores";
import { userCartChartData } from "./homePage/data/userCartChartData";
import NotificationListener from "../general/NotificationListener";
import Popup from "../general/Popup";
import SendNotifications from "./notifications/SendNotifications";
import "./notifications/css/sendNotifications.css";
import StoreProfile from "./storeProfile/StoreProfile";
import AboutUs from "../general/AboutUs";
import Services from "../general/Services";
import Contact from "../general/Contact";

function AdminHome(props) {
  const [currentTab, setCurrentTab] = useState("main");
  const [profile, setProfile] = useState(-1);
  const [categories, setCategories] = useState(-1);
  const [roles, setRoles] = useState(-1);
  const [blocks, setBlocks] = useState(-1);
  const [packs, setPacks] = useState(-1);
  const [configs, setConfigs] = useState(-1);
  const [packsChart, setPacksChart] = useState(packsChartData);
  const [notifications, setNotifications] = useState(-1);
  const [employees, setEmployees] = useState(-1);
  const [acceptedStores, setAcceptedStores] = useState(-1);
  const [pendingStores, setPendingStores] = useState(-1);
  const [users, setUsers] = useState(-1);
  const [homeCount, setHomeCount] = useState(userChartData);
  const [homeUserChart, setHomeUserChart] = useState(userChartData);
  const [homeStoreChart, setHomeStoreChart] = useState(storeChartData);
  const [homeCityChart, setHomeCityChart] = useState(cityChartData);
  const [homeCartChart, setHomeCartChart] = useState(cartChartData);
  const [homeUserCartChart, setHomeUserCartChart] = useState(userCartChartData);
  const [usersAgeChart, setUsersAgeChart] = useState(usersAges);
  const [usersGenderChart, setUsersGenderChart] = useState(usersGender);
  const [usersBlockedChart, setUsersBlockedChart] = useState(usersBlocked);
  const [loading, setLoading] = useState(false);
  const [notificationsPage, setNotificationsPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [openNotificationsSend, setOpenNotificationsSend] = useState(false);

  useEffect(() => {
    if (notifications == -1) getNotifications(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setNotifications, notifications, props.toast, notificationsPage, setNotificationsPage);
  }, []);
  useEffect(() => {
    if (notifications != -1) setLoading(false);
  }, [notifications]);

  try {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <NotificationListener />

            <Navbar
              setOpenNotificationsSend={setOpenNotificationsSend}
              notifications={notifications}
              setNotifications={setNotifications}
              tabs={adminTabs}
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
              userInformation={props.userInformation}
              setUserInformation={props.setUserInformation}
              refreshStatus={props.refreshStatus}
              setRefreshStatus={props.setRefreshStatus}
              toast={props.toast}
              navigate={props.navigate}
              notificationsPage={notificationsPage}
              setNotificationsPage={setNotificationsPage}
            />
            <Routes>
              <Route path="/" exact element={<Main />} />
              <Route path="/main" exact element={<Main />} />
              <Route path="/services" exact element={<Services />} />
              <Route path="/aboutUs" exact element={<AboutUs />} />
              <Route path="/contactUs" exact element={<Contact />} />
              <Route
                path="/home"
                exact
                element={
                  <Home
                    configs={configs}
                    setConfigs={setConfigs}
                    homeCount={homeCount}
                    setHomeCount={setHomeCount}
                    homeUserChart={homeUserChart}
                    setHomeUserChart={setHomeUserChart}
                    homeStoreChart={homeStoreChart}
                    setHomeStoreChart={setHomeStoreChart}
                    homeCityChart={homeCityChart}
                    setHomeCityChart={setHomeCityChart}
                    homeCartChart={homeCartChart}
                    setHomeCartChart={setHomeCartChart}
                    homeUserCartChart={homeUserCartChart}
                    setHomeUserCartChart={setHomeUserCartChart}
                    userInformation={props.userInformation}
                    setUserInformation={props.setUserInformation}
                    refreshStatus={props.refreshStatus}
                    setRefreshStatus={props.setRefreshStatus}
                    toast={props.toast}
                    navigate={props.navigate}
                  />
                }
              />
              <Route path="/profile" exact element={<Profile profile={profile} setProfile={setProfile} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/categories" exact element={<Categories categories={categories} setCategories={setCategories} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/roles" exact element={<Roles roles={roles} setRoles={setRoles} employees={employees} setEmployees={setEmployees} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/blocks" exact element={<Blocks blocks={blocks} setBlocks={setBlocks} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/packs" exact element={<Packs packs={packs} setPacks={setPacks} packsChart={packsChart} setPacksChart={setPacksChart} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/employees" exact element={<Employees employees={employees} roles={roles} setRoles={setRoles} setEmployees={setEmployees} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              <Route
                path="/stores"
                exact
                element={
                  <Stores
                    categories={categories}
                    setCategories={setCategories}
                    acceptedStores={acceptedStores}
                    setAcceptedStores={setAcceptedStores}
                    pendingStores={pendingStores}
                    setPendingStores={setPendingStores}
                    userInformation={props.userInformation}
                    setUserInformation={props.setUserInformation}
                    refreshStatus={props.refreshStatus}
                    setRefreshStatus={props.setRefreshStatus}
                    toast={props.toast}
                    navigate={props.navigate}
                  />
                }
              />
              <Route path="/stores/:id" exact element={<StoreProfile userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              <Route
                path="/users"
                exact
                element={
                  <Users
                    users={users}
                    setUsers={setUsers}
                    blocks={blocks}
                    setBlocks={setBlocks}
                    categories={categories}
                    setCategories={setCategories}
                    usersAgeChart={usersAgeChart}
                    setUsersAgeChart={setUsersAgeChart}
                    usersGenderChart={usersGenderChart}
                    setUsersGenderChart={setUsersGenderChart}
                    usersBlockedChart={usersBlockedChart}
                    setUsersBlockedChart={setUsersBlockedChart}
                    userInformation={props.userInformation}
                    setUserInformation={props.setUserInformation}
                    refreshStatus={props.refreshStatus}
                    setRefreshStatus={props.setRefreshStatus}
                    toast={props.toast}
                    navigate={props.navigate}
                  />
                }
              />
              <Route
                path="/users/:id"
                exact
                element={<UserProfile categories={categories} setCategories={setCategories} users={users} setUsers={setUsers} blocks={blocks} setBlocks={setBlocks} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />}
              />
            </Routes>
            {openNotificationsSend ? <Popup classes={"form-popup"} setOpen={setOpenNotificationsSend} component={<SendNotifications categories={categories} setCategories={setCategories} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />} /> : null}
          </>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default AdminHome;
