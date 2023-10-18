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
import checkShow from "../../functions/checkShow";
import Page404 from "../general/Page404";
import VerifyEmail from "../general/VerifyEmail";
import getNotificationsCount from "../../functions/getNotificationsCount";

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
  const [loading, setLoading] = useState(true);
  const [notificationsPage, setNotificationsPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [openNotificationsSend, setOpenNotificationsSend] = useState(false);
  const [thereIsNotifications, setThereIsNotifications] = useState(-1);

  useEffect(() => {
    if (thereIsNotifications == -1) getNotificationsCount(setThereIsNotifications, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setNotifications, notifications, props.toast, notificationsPage, setNotificationsPage);
  }, []);
  useEffect(() => {
    if (thereIsNotifications != -1) setLoading(false);
  }, [thereIsNotifications]);

  try {
    return (
      <>
        {loading ? (
          <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Loading />
          </div>
        ) : (
          <>
            <NotificationListener notifications={notifications} setNotifications={setNotifications} />

            <Navbar
              setThereIsNotifications={setThereIsNotifications}
              thereIsNotifications={thereIsNotifications}
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
              <Route path="/account/*" exact element={<VerifyEmail profile={profile} setProfile={setProfile} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />} />

              {checkShow(props.userInformation, ["home"]) ? (
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
              ) : null}
              <Route path="/profile" exact element={<Profile profile={profile} setProfile={setProfile} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              {checkShow(props.userInformation, ["categories"]) ? <Route path="/categories" exact element={<Categories categories={categories} setCategories={setCategories} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} /> : null}
              {checkShow(props.userInformation, ["roles"]) ? (
                <Route path="/roles" exact element={<Roles roles={roles} setRoles={setRoles} employees={employees} setEmployees={setEmployees} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              ) : null}
              {checkShow(props.userInformation, ["blocks"]) ? <Route path="/blocks" exact element={<Blocks blocks={blocks} setBlocks={setBlocks} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} /> : null}
              {checkShow(props.userInformation, ["packs"]) ? (
                <Route path="/packs" exact element={<Packs packs={packs} setPacks={setPacks} packsChart={packsChart} setPacksChart={setPacksChart} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              ) : null}
              {checkShow(props.userInformation, ["employees"]) ? (
                <Route path="/employees" exact element={<Employees employees={employees} roles={roles} setRoles={setRoles} setEmployees={setEmployees} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              ) : null}
              {checkShow(props.userInformation, ["stores"]) ? (
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
              ) : null}
              {checkShow(props.userInformation, ["stores"]) ? <Route path="/stores/:id" exact element={<StoreProfile userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} /> : null}
              {checkShow(props.userInformation, ["users"]) ? (
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
              ) : null}
              {checkShow(props.userInformation, ["users"]) ? (
                <Route
                  path="/users/:id"
                  exact
                  element={<UserProfile categories={categories} setCategories={setCategories} users={users} setUsers={setUsers} blocks={blocks} setBlocks={setBlocks} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />}
                />
              ) : null}
              <Route path="/*" exact element={<Page404 />} />
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
