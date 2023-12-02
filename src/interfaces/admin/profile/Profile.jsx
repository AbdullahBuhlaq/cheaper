import { useEffect, useState } from "react";
import getProfile from "../../../functions/getProfile";
import Loading from "../../general/Loading";
import Popup from "../../general/Popup";
import ChangeEmail from "../../general/ChangeEmail";
import ChangePassword from "../../general/ChangePassword";
import ChangePhoneNumber from "../../general/ChangePhoneNumber";
import "./css/profile.css";
import ProfileLeft from "./profileSection/profileLeft";
import ProfileBody from "./profileSection/ProfileBody";
import HeaderButton from "../../../components/mainArea";
import UpdateProfile from "./UpdateProfile";
import SendCode from "../../general/SendCode";
import logoutDevice from "../../../functions/logoutDevice";

function Profile(props) {
  const [loading, setLoading] = useState(true);
  const [popupStatus, setPopupStatus] = useState(false);
  useEffect(() => {
    if (props.profile == -1) getProfile(props.setProfile, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
  }, []);
  useEffect(() => {
    if (props.profile != -1) setLoading(false);
  }, [props.profile]);

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
              <ProfileLeft profile={props.profile} setPopupStatus={setPopupStatus} />

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
              <Popup setOpen={setPopupStatus} classes={"form-popup-small"} component={<SendCode profile={props.profile} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setPopupStatus} setProfile={props.setProfile} />} />
            ) : null}
          </>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Profile;
