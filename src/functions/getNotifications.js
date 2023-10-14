import requestOptions from "../constants/requestOptions";
import refreshToken from "./refreshToken";

async function getNotifications(userInformation, setUserInformation, refreshStatus, setRefreshStatus, setNotifications, notifications, toast, notificationsPage, setNotificationsPage) {
  try {
    setNotificationsPage({ ...notificationsPage, loadingNow: true });
    let url = `${import.meta.env.VITE_URL}/account/notification?`;
    url += `page=${notificationsPage.page}`;
    url += `&`;
    url += `size=${notificationsPage.size}`;
    let response = await fetch(url, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();

    // const data = {
    //   success: true,
    //   data: [
    //     {
    //       id: 1,
    //       title: "hello",
    //       message: "المحتوى هون ",
    //       avatar: null,
    //     },
    //   ],
    // };
    if (data.success) {
      if (!data.data.length) {
        setNotificationsPage({ ...notificationsPage, loadMore: false, loadingNow: false });
        if (notifications == -1 || notificationsPage.page == 1) setNotifications([]);
      } else {
        if (notificationsPage.page == 1) setNotifications([...data.data]);
        else setNotifications([...notifications, ...data.data]);

        setNotificationsPage({ ...notificationsPage, page: notificationsPage.page + 1, loadMore: true, loadingNow: false });
      }
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getNotifications({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setNotifications, notifications, toast, notificationsPage, setNotificationsPage);
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

export default getNotifications;
