import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getUsers(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  setUsers,
  users,
  toast,
  filter,
  usersPage,
  setUsersPage
) {
  try {
    setUsersPage({ ...usersPage, loadingNow: true });
    let url = `${import.meta.env.VITE_URL}/admin/users/?`;
    let andMark = false;
    await Promise.all(
      Object.keys(filter).map((filterKey) => {
        if (filter[filterKey] != -1 && filter[filterKey] != "") {
          if (andMark) url += `&`;
          url += `${filterKey}=${filter[filterKey]}`;
          andMark = true;
        }
      })
    );
    if (andMark) url += `&`;
    url += `page=${usersPage.page}`;
    andMark = true;
    if (andMark) url += `&`;
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
    if (data.success) {
      if (!data.data.data.length) {
        setUsersPage({
          ...usersPage,
          search: false,
          loadMore: false,
          loadingNow: false,
          OnlyClick: false,
        });
        if (users == -1 || usersPage.page == 1) setUsers({});
      } else {
        let finalUsers = {};
        await Promise.all(
          data.data.data.map(async (user) => {
            finalUsers[user.id] = { ...user };
          })
        );

        if (usersPage.page == 1) setUsers({ ...finalUsers });
        else setUsers({ ...users, ...finalUsers });

        setUsersPage({
          ...usersPage,
          search: false,
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
        await getUsers(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          setUsers,
          users,
          toast,
          filter,
          usersPage,
          setUsersPage
        );
      } else {
        setUsersPage({
          ...usersPage,
          search: false,
          loadingNow: false,
          OnlyClick: true,
        });
        console.log(data.message);
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    setUsersPage({
      ...usersPage,
      search: false,
      loadingNow: false,
      OnlyClick: true,
    });
    console.log(err);
  }
}
