import { useEffect, useState } from "react";
import getNotifications from "../../functions/getNotifications";
import Navbar from "../../components/Navbar";
import { Route, Routes } from "react-router-dom";
import { userTabs } from "../../constants/generalTabs";
import Loading from "../general/Loading";
import Main from "../general/Main";
import NotificationListener from "../general/NotificationListener";
import Popup from "../general/Popup";
import UserProfile from "./profile/UserProfile";
import HomeOfUser from "./homePage/HomeOfUser";
import Offers from "./cardsArchive/Offers";
import Services from "../general/Services";
import AboutUs from "../general/AboutUs";
import Contact from "../general/Contact";

function UserHome(props) {
  const [currentTab, setCurrentTab] = useState("profile");
  const [notifications, setNotifications] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [notificationsPage, setNotificationsPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [profile, setProfile] = useState(-1);
  // const [packs, setPacks] = useState(-1);
  // const [packsChart, setPacksChart] = useState(packsStoreInformationChart);
  const [homeInfo, setHomeInfo] = useState(-1);
  const [categories, setCategories] = useState(-1);
  const [offers, setOffers] = useState(-1);

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
              notifications={notifications}
              setNotifications={setNotifications}
              tabs={userTabs}
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
              <Route path="/home" exact element={<HomeOfUser homeInfo={homeInfo} setHomeInfo={setHomeInfo} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/offers" exact element={<Offers offers={offers} setOffers={setOffers} categories={categories} setCategories={setCategories} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
              <Route path="/profile" exact element={<UserProfile categories={categories} setCategories={setCategories} profile={profile} setProfile={setProfile} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
            </Routes>

            {}
          </>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default UserHome;
