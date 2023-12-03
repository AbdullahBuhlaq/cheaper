import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import HeaderButton from "../../../components/mainArea";
import Popup from "../../general/Popup";
import ChangeEmail from "../../general/ChangeEmail";
import ChangePassword from "../../general/ChangePassword";
import ChangePhoneNumber from "../../general/ChangePhoneNumber";
import getProfile from "../../../functions/getProfile";
import UserProfileLeft from "./UserProfileLeft";
import UpdateProfile from "./UpdateProfile";
import getGeneralCategories from "../../../functions/getGeneralCategories";
import UserBody from "./UserBody";
import logoutDevice from "../../../functions/logoutDevice";

function UserProfile(props) {
  const [loading, setLoading] = useState(true);
  const [popupStatus, setPopupStatus] = useState(false);

  useEffect(() => {
    if (props.profile == -1) getProfile(props.setProfile, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
  }, []);
  useEffect(() => {
    if (props.profile != -1 && props.categories != -1) setLoading(false);
  }, [props.profile, props.categories]);

  useEffect(() => {
    if (props.categories == -1) getGeneralCategories(props.setCategories, props.toast);
  }, []);

  function logoutDeviceFunc(id) {
    logoutDevice(id, props.setProfile, props.profile, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
  }

  try {
    return (
      <>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <Loading />
          </div>
        ) : (
          <>
            <HeaderButton />

            <div className="main-profile">
              <UserProfileLeft profile={props.profile} setPopupStatus={setPopupStatus} userInformation={props.userInformation} />

              <UserBody profile={props.profile} logoutDevice={logoutDeviceFunc} />
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
              <>
                <Popup
                  setOpen={setPopupStatus}
                  classes={"form-popup-small"}
                  component={<UpdateProfile categories={props.categories} profile={props.profile} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setPopupStatus} setProfile={props.setProfile} />}
                />
              </>
            ) : null}
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserProfile;
