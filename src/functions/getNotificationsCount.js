import requestOptions from "../constants/requestOptions";
import refreshToken from "./refreshToken";

async function getNotificationsCount(setThereIsNotifications, userInformation, setUserInformation, refreshStatus, setRefreshStatus, setNotifications, notifications, toast, notificationsPage, setNotificationsPage) {
  try {
    let url = `${import.meta.env.VITE_URL}/account/count-notification`;

    let response = await fetch(url, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    console.log(data);

    if (data.success) {
      setThereIsNotifications(data.count);
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getNotificationsCount(setThereIsNotifications, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setNotifications, notifications, toast, notificationsPage, setNotificationsPage);
      } else {
        setNotificationsPage({ ...notificationsPage, loadingNow: false });
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    setNotificationsPage({ ...notificationsPage, loadingNow: false });
    console.log(err);
  }
}

export default getNotificationsCount;
