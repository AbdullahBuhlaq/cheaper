import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Route, Routes } from "react-router-dom";
import { userTabs } from "../../constants/generalTabs";
import Loading from "../general/Loading";
import Main from "../general/Main";
import NotificationListener from "../general/NotificationListener";
import UserProfile from "./profile/UserProfile";
import HomeOfUser from "./homePage/HomeOfUser";
import Offers from "./cardsArchive/Offers";
import Page404 from "../general/Page404";
import Confitte from "react-confetti";
import getNotificationsCount from "../../functions/getNotificationsCount";
import checkShow from "../../functions/checkShow";

function UserHome(props) {
  const [currentTab, setCurrentTab] = useState("main");
  const [notifications, setNotifications] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [notificationsPage, setNotificationsPage] = useState({
    page: 1,
    size: 5,
    loadMore: true,
    loadingNow: false,
  });
  const [profile, setProfile] = useState(-1);
  const [homeInfo, setHomeInfo] = useState(-1);
  const [categories, setCategories] = useState(-1);
  const [offers, setOffers] = useState(-1);
  const [thereIsNotifications, setThereIsNotifications] = useState(-1);

  useEffect(() => {
    if (thereIsNotifications == -1)
      getNotificationsCount(
        setThereIsNotifications,
        props.userInformation,
        props.setUserInformation,
        props.refreshStatus,
        props.setRefreshStatus,
        setNotifications,
        notifications,
        props.toast,
        notificationsPage,
        setNotificationsPage
      );
  }, []);
  useEffect(() => {
    if (thereIsNotifications != -1) setLoading(false);
  }, [thereIsNotifications]);

  const [run, setRun] = useState(false);

  try {
    return (
      <>
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        ) : (
          <>
            <NotificationListener
              notifications={notifications}
              setNotifications={setNotifications}
            />

            {run ? (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  zIndex: 100,
                }}
              >
                <Confitte
                  numberOfPieces={900}
                  width={window.innerWidth}
                  height={window.innerHeight}
                  onConfettiComplete={() => {
                    setRun(false);
                  }}
                  run={run}
                  recycle={false}
                />
                <Confitte
                  numberOfPieces={300}
                  width={window.innerWidth}
                  height={window.innerHeight}
                  run={run}
                  recycle={false}
                  drawShape={(ctx) => {
                    ctx.beginPath();
                    for (let i = 0; i < 22; i++) {
                      const angle = 0.35 * i;
                      const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                      const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                      ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                    ctx.closePath();
                  }}
                />
              </div>
            ) : null}

            <Navbar
              setThereIsNotifications={setThereIsNotifications}
              thereIsNotifications={thereIsNotifications}
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
              <Route path="/" exact element={<Main toast={props.toast} />} />
              <Route
                path="/main"
                exact
                element={<Main toast={props.toast} />}
              />

              {checkShow(props.userInformation, ["home"]) ? (
                <Route
                  path="/home"
                  exact
                  element={
                    <HomeOfUser
                      setRun={setRun}
                      homeInfo={homeInfo}
                      setHomeInfo={setHomeInfo}
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
              {checkShow(props.userInformation, ["offers"]) ? (
                <Route
                  path="/offers"
                  exact
                  element={
                    <Offers
                      offers={offers}
                      setOffers={setOffers}
                      categories={categories}
                      setCategories={setCategories}
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
              <Route
                path="/profile"
                exact
                element={
                  <UserProfile
                    categories={categories}
                    setCategories={setCategories}
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

export default UserHome;
