import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

export default async function getStoreUsers(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  setUsers,
  users,
  toast,
  usersPage,
  setUsersPage
) {
  try {
    setUsersPage({ ...usersPage, loadingNow: true });

    let response = await fetch(
      `${import.meta.env.VITE_URL}/store/users/?&page=${usersPage.page}&size=${
        usersPage.size
      }`,
      {
        ...requestOptions,
        method: "get",
        headers: {
          ...requestOptions.headers,
          authorization: userInformation.token,
        },
      }
    );
    let data = await response.json();
    // let data = {
    //   success: true,
    //   data: [
    //     {
    //       createdAt: "2023-09-17T20:15:45.000Z",
    //       discount: 15,
    //       dataTake: "2023-08-05T00:00:00.000Z",
    //       "user.name": "raed almasri",
    //       "user.avatar": '["http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb_200x200.webp","http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb_400x400.webp","http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb_600x600.webp","http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb.jpg"]',
    //     },
    //   ],
    // };
    if (data.success) {
      if (!data.data.data.length) {
        setUsersPage({
          ...usersPage,
          loadMore: false,
          loadingNow: false,
          OnlyClick: false,
        });
        if (users == -1 || usersPage.page == 1) setUsers([]);
      } else {
        if (usersPage.page == 1) setUsers([...data.data.data]);
        else setUsers([...users, ...data.data.data]);

        setUsersPage({
          ...usersPage,
          page: usersPage.page + 1,
          loadMore: true,
          loadingNow: false,
          OnlyClick: false,
        });
      }
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getStoreUsers(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          setUsers,
          users,
          toast,
          usersPage,
          setUsersPage
        );
      } else {
        setUsersPage({ ...usersPage, loadingNow: false, OnlyClick: true });
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    setUsersPage({ ...usersPage, loadingNow: false, OnlyClick: true });
    console.log(err);
  }
}
