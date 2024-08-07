import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getSpam(
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
    }/admin/stores/evaluation/?type=spam&storeId=${id}`;

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
    //       reasonSpam: "هاد الزلمي كذاب ما عطاني العرض هاد الزلمي كذاب ما عطاني الع هاد الزلمي كذاب ما عطاني الع هاد الزلمي كذاب ما عطاني الع هاد الزلمي كذاب ما عطاني الع ",
    //       createdAt: "2022-09-09T20:15:45.000Z",
    //       "user.name": "raed almasri",
    //       avatar: "http://localhost:3010/images/static/logo_200x200.webp",
    //     },
    //     {
    //       reasonSpam: null,
    //       createdAt: "2023-09-19T21:45:51.000Z",
    //       "user.name": "raed almasri",
    //       avatar: "http://localhost:3010/images/static/logo_200x200.webp",
    //     },
    //     {
    //       reasonSpam: null,
    //       createdAt: "2023-09-20T07:16:28.000Z",
    //       "user.name": "raed almasri",
    //       avatar: "http://localhost:3010/images/static/logo_200x200.webp",
    //     },
    //     {
    //       reasonSpam: null,
    //       createdAt: "2023-09-20T07:27:01.000Z",
    //       "user.name": "raed almasri",
    //       avatar: "http://localhost:3010/images/static/logo_200x200.webp",
    //     },
    //     {
    //       reasonSpam: null,
    //       createdAt: "2023-09-20T07:29:54.000Z",
    //       "user.name": "raed almasri",
    //       avatar: "http://localhost:3010/images/static/logo_200x200.webp",
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
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getSpam(
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
        console.log(data.message);
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    setUsersPage({ ...usersPage, loadingNow: false, OnlyClick: true });
    console.log(err);
  }
}
