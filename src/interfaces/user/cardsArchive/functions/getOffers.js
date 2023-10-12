import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getOffers(userInformation, setUserInformation, refreshStatus, setRefreshStatus, setOffers, offers, toast, filter, offersPage, setOffersPage) {
  try {
    setOffersPage({ ...offersPage, loadingNow: true });
    let url = `${import.meta.env.VITE_URL}/user/offer?`;
    let andMark = false;
    await Promise.all(
      Object.keys(filter).map(async (filterKey) => {
        if (filter[filterKey] != -1 && filter[filterKey] != "") {
          if (filterKey == "categoryIds") {
            await Promise.all(
              filter[filterKey].map((item) => {
                if (andMark) url += `&`;
                url += `${"categoryIds[]"}=${item}`;
                andMark = true;
              })
            );
          } else {
            if (andMark) url += `&`;
            url += `${filterKey}=${filter[filterKey]}`;
            andMark = true;
          }
        }
      })
    );
    if (andMark) url += `&`;
    url += `page=${offersPage.page}`;
    andMark = true;
    if (andMark) url += `&`;
    url += `size=${offersPage.size}`;
    let response = await fetch(url, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      if (!data.data.length) {
        setOffersPage({ ...offersPage, loadMore: false, loadingNow: false, OnlyClick: false });
        if (offers == -1 || offersPage.page == 1) setOffers({});
      } else {
        let finalUsers = {};
        await Promise.all(
          data.data.map(async (user) => {
            finalUsers[user.offerUserId] = { ...user };
          })
        );

        if (offersPage.page == 1) setOffers({ ...finalUsers });
        else setOffers({ ...offers, ...finalUsers });

        setOffersPage({ ...offersPage, page: offersPage.page + 1, loadMore: true, loadingNow: false, OnlyClick: false });
      }
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getOffers({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setOffers, offers, toast, filter, offersPage, setOffersPage);
      } else {
        setOffersPage({ ...offersPage, loadingNow: false, OnlyClick: true });
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    setOffersPage({ ...offersPage, loadingNow: false, OnlyClick: true });
    console.log(err);
  }
}
