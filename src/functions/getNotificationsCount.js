import requestOptions from "../constants/requestOptions";
import refreshToken from "./refreshToken";

async function getNotificationsCount(
  setThereIsNotifications,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  setNotifications,
  notifications,
  toast,
  notificationsPage,
  setNotificationsPage
) {
  try {
    let url = `${import.meta.env.VITE_URL}/account/count-notification`;

    let response = await fetch(url, {
      ...requestOptions,
      method: "get",
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
    });
    let data = await response.json();

    if (data.success) {
      setThereIsNotifications(data.data.count);
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getNotificationsCount(
          setThereIsNotifications,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          setNotifications,
          notifications,
          toast,
          notificationsPage,
          setNotificationsPage
        );
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default getNotificationsCount;
