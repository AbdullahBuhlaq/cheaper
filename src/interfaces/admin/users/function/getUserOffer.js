import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getUserOffer(userInformation, setUserInformation, refreshStatus, setRefreshStatus, id, setUserOffer, userOffer, toast, filter, usersPage, setUsersPage) {
  try {
    setUsersPage({ ...usersPage, loadingNow: true });
    let url = `${import.meta.env.VITE_URL}/admin/users/offer-user/?userId=${id}`;
    await Promise.all(
      Object.keys(filter).map((filterKey) => {
        if (filter[filterKey] != -1 && filter[filterKey] != "") {
          url += `&`;
          url += `${filterKey}=${filter[filterKey]}`;
        }
      })
    );
    url += `&`;
    url += `page=${usersPage.page}`;
    url += `&`;
    url += `size=${usersPage.size}`;

    let response = await fetch(url, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    // const data = {
    //   success: true,
    //   data: [
    //     {
    //       id: 2,
    //       createdAt: "2023-09-17T20:15:45.000Z",
    //       discount: 15,
    //       dataTake: "2023-08-05T00:00:00.000Z",
    //       offerType: "مجاني",
    //       nameStore: "2مح333333ل ابو رائد",
    //       avatar: null,
    //     },
    //     {
    //       id: 3,
    //       createdAt: "2022-09-17T20:15:45.000Z",
    //       discount: 15,
    //       dataTake: "2023-08-05T00:00:00.000Z",
    //       offerType: "مجاني",
    //       nameStore: "2مح333333ل ابو رائد",
    //       avatar: null,
    //     },
    //     {
    //       id: 4,
    //       createdAt: "2022-09-17T20:15:45.000Z",
    //       discount: 15,
    //       dataTake: "2023-08-05T00:00:00.000Z",
    //       offerType: "مجاني",
    //       nameStore: "2مح333333ل ابو رائد",
    //       avatar: null,
    //     },
    //     {
    //       id: 5,
    //       createdAt: "2022-09-17T20:15:45.000Z",
    //       discount: 15,
    //       dataTake: "2023-08-05T00:00:00.000Z",
    //       offerType: "مجاني",
    //       nameStore: "2مح333333ل ابو رائد",
    //       avatar: null,
    //     },
    //   ],
    // };
    if (data.success) {
      if (!data.data.length) {
        setUsersPage({ ...usersPage, loadMore: false, loadingNow: false, OnlyClick: false });
        if (userOffer == -1 || usersPage.page == 1) setUserOffer({});
      } else {
        let finalUsers = {};
        await Promise.all(
          data.data.map(async (user) => {
            finalUsers[user.id] = { ...user };
          })
        );

        if (usersPage.page == 1) setUserOffer({ ...finalUsers });
        else setUserOffer({ ...userOffer, ...finalUsers });

        setUsersPage({ ...usersPage, page: usersPage.page + 1, loadMore: true, loadingNow: false, OnlyClick: false });
      }
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getUserOffer({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, id, setUserOffer, userOffer, toast, filter, usersPage, setUsersPage);
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
