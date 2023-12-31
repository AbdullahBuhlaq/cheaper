import { useState, useEffect } from "react";
import Loading from "../../../general/Loading";
import Popup from "../../../general/Popup";
import getProfile from "../../../../functions/getProfile";
import "./css/profile.css";
import getStoreInformation from "./functions/getStoreInformation";
import ChangeEmail from "../../../general/ChangeEmail";
import ChangePassword from "../../../general/ChangePassword";
import ChangePhoneNumber from "../../../general/ChangePhoneNumber";
import ProfileLeft from "./profileSection/profileLeft";
import ProfileBody from "./profileSection/ProfileBody";
import HeaderButton from "../../../../components/mainArea";
import UpdateProfile from "./UpdateProfile";
import UpdateStoreInformation from "./UpdateStoreInformation";
import getGeneralCategories from "../../../../functions/getGeneralCategories";
import SendCode from "../../../general/SendCode";
import logoutDevice from "../../../../functions/logoutDevice";

function PendingShopkeeperProfile(props) {
  const [loading, setLoading] = useState(true);
  const [popupStatus, setPopupStatus] = useState(false);

  useEffect(() => {
    if (props.categories == -1) getGeneralCategories(props.setCategories, props.toast);
    if (props.storeInformation == -1) getStoreInformation(props.setStoreInformation, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
    if (props.profile == -1) getProfile(props.setProfile, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
  }, []);
  useEffect(() => {
    if (props.profile != -1 && props.storeInformation != -1) setLoading(false);
  }, [props.profile, props.storeInformation]);

  function logoutDeviceFunc(id) {
    logoutDevice(id, props.setProfile, props.profile, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
  }

  try {
    return (
      <>
        {loading ? (
          <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Loading />
          </div>
        ) : (
          <>
            <HeaderButton />

            <div className="main-profile">
              <ProfileLeft storeInformation={props.storeInformation} profile={props.profile} setPopupStatus={setPopupStatus} />

              <ProfileBody profile={props.profile} logoutDevice={logoutDeviceFunc} />
            </div>

            {popupStatus == 1 ? (
              <Popup
                setOpen={setPopupStatus}
                classes={"form-popup-small"}
                component={
                  <ChangeEmail profile={props.profile.userInformation} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setPopupStatus} setProfile={(userInformation) => props.setProfile({ ...props.profile, userInformation: { ...userInformation } })} />
                }
              />
            ) : popupStatus == 2 ? (
              <Popup
                setOpen={setPopupStatus}
                classes={"form-popup-small"}
                component={
                  <ChangePassword profile={props.profile.userInformation} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setPopupStatus} setProfile={(userInformation) => props.setProfile({ ...props.profile, userInformation: { ...userInformation } })} />
                }
              />
            ) : popupStatus == 3 ? (
              <Popup
                setOpen={setPopupStatus}
                classes={"form-popup-small"}
                component={
                  <ChangePhoneNumber
                    profile={props.profile.userInformation}
                    userInformation={props.userInformation}
                    setUserInformation={props.setUserInformation}
                    refreshStatus={props.refreshStatus}
                    setRefreshStatus={props.setRefreshStatus}
                    toast={props.toast}
                    setEdit={setPopupStatus}
                    setProfile={(userInformation) => props.setProfile({ ...props.profile, userInformation: { ...userInformation } })}
                  />
                }
              />
            ) : popupStatus == 4 ? (
              <Popup
                setOpen={setPopupStatus}
                classes={"form-popup-small"}
                component={
                  <UpdateProfile profile={props.profile.userInformation} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setPopupStatus} setProfile={(userInformation) => props.setProfile({ ...props.profile, userInformation: { ...userInformation } })} />
                }
              />
            ) : popupStatus == 5 ? (
              <Popup
                setOpen={setPopupStatus}
                classes={"form-popup-small"}
                component={<UpdateStoreInformation categories={props.categories} storeInformation={props.storeInformation} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setPopupStatus} setStoreInformation={props.setStoreInformation} />}
              />
            ) : popupStatus == 6 ? (
              <Popup setOpen={setPopupStatus} classes={"form-popup-small"} component={<SendCode profile={props.profile} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setPopupStatus} setProfile={props.setProfile} />} />
            ) : null}
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PendingShopkeeperProfile;
