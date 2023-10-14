import { useEffect, useState } from "react";
import getNotifications from "../../../functions/getNotifications";
import Navbar from "../../../components/Navbar";
import { Route, Routes } from "react-router-dom";
import { acceptedShopkeeperTabs } from "../../../constants/generalTabs";
import Loading from "../../general/Loading";
import Main from "../../general/Main";
import NotificationListener from "../../general/NotificationListener";
import Popup from "../../general/Popup";
import "./notifications/css/sendNotifications.css";
import PendingShopkeeperProfile from "./profile/PendingShopkeeperProfile";
import StoreInformation from "./storeInformation/storeInformation";
import packsStoreInformationChart from "./storeInformation/data/packsChart";
import { acceptedStoreChart } from "./storeInformation/data/acceptedStoreChart";
import Services from "../../general/Services";
import AboutUs from "../../general/AboutUs";
import Contact from "../../general/Contact";
import Page404 from "../../general/Page404";
import VerifyEmail from "../../general/VerifyEmail";
import getNotificationsCount from "../../../functions/getNotificationsCount";

function ShopkeeperHome(props) {
  const [currentTab, setCurrentTab] = useState("main");
  const [notifications, setNotifications] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [notificationsPage, setNotificationsPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [openNotificationsSend, setOpenNotificationsSend] = useState(false);
  const [profile, setProfile] = useState(-1);
  const [storeInformation, setStoreInformation] = useState(-1);
  const [storeUsers, setStoreUsers] = useState(-1);
  const [usersPage, setUsersPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [categories, setCategories] = useState(-1);
  const [storeChart, setStoreChart] = useState(acceptedStoreChart);
  const [packs, setPacks] = useState(-1);
  const [packsChart, setPacksChart] = useState(packsStoreInformationChart);
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
          <Loading />
        ) : (
          <>
            <NotificationListener notifications={notifications} setNotifications={setNotifications} />

            <Navbar
              setThereIsNotifications={setThereIsNotifications}
              thereIsNotifications={thereIsNotifications}
              setOpenNotificationsSend={setOpenNotificationsSend}
              notifications={notifications}
              setNotifications={setNotifications}
              tabs={acceptedShopkeeperTabs}
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
              pendingSendNotifications={true}
            />
            <Routes>
              <Route path="/" exact element={<Main />} />
              <Route path="/main" exact element={<Main />} />
              <Route path="/services" exact element={<Services />} />
              <Route path="/aboutUs" exact element={<AboutUs />} />
              <Route path="/contactUs" exact element={<Contact />} />
              <Route path="/account/*" exact element={<VerifyEmail profile={profile} setProfile={setProfile} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />} />

              <Route path="/profile" exact element={<PendingShopkeeperProfile profile={profile} setProfile={setProfile} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              <Route
                path="/storeInformation"
                exact
                element={
                  <StoreInformation
                    usersPage={usersPage}
                    setUsersPage={setUsersPage}
                    storeUsers={storeUsers}
                    setStoreUsers={setStoreUsers}
                    packsChart={packsChart}
                    setPacksChart={setPacksChart}
                    storeChart={storeChart}
                    setStoreChart={setStoreChart}
                    packs={packs}
                    setPacks={setPacks}
                    categories={categories}
                    setCategories={setCategories}
                    storeInformation={storeInformation}
                    setStoreInformation={setStoreInformation}
                    profile={profile}
                    setProfile={setProfile}
                    userInformation={props.userInformation}
                    setUserInformation={props.setUserInformation}
                    refreshStatus={props.refreshStatus}
                    setRefreshStatus={props.setRefreshStatus}
                    toast={props.toast}
                    navigate={props.navigate}
                  />
                }
              />
              <Route path="/*" exact element={<Page404 />} />
            </Routes>
          </>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default ShopkeeperHome;
