import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getStoreEva(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  setUsers,
  users,
  toast,
  usersPage,
  setUsersPage,
  id
) {
  try {
    setUsersPage({ ...usersPage, loadingNow: true });
    let url = `${
      import.meta.env.VITE_URL
    }/admin/stores/evaluation/?type=evaluate&storeId=${id}`;

    url += `&`;
    url += `page=${usersPage.page}`;
    url += `&`;
    url += `size=${usersPage.size}`;
    let response = await fetch(url, {
      ...requestOptions,
      method: "get",
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
    });
    let data = await response.json();
    // const data = {
    //   success: true,
    //   data: [
    //     {
    //       evaluate: 90,
    //       createdAt: "2023-09-17T20:15:45.000Z",
    //       "user.name": "raed almasri",
    //       avatar: '["http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb_200x200.webp","http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb_400x400.webp","http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb_600x600.webp","http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb.jpg"]',
    //     },
    //     {
    //       evaluate: 90,
    //       createdAt: "2022-09-17T20:15:45.000Z",
    //       "user.name": "raed almasri",
    //       avatar: '["http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb_200x200.webp","http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb_400x400.webp","http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb_600x600.webp","http://localhost:3010/images/5cb9c6dc-22a6-4f74-a6bf-712b70e3fceb.jpg"]',
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
        await getStoreEva(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          setUsers,
          users,
          toast,
          usersPage,
          setUsersPage,
          id
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
