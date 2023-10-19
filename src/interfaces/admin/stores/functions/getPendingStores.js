import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getPendingStores(userInformation, setUserInformation, refreshStatus, setRefreshStatus, setPendingStores, pendingStores, toast, filter, pendingStoresPage, setPendingStoresPage) {
  try {
    setPendingStoresPage({ ...pendingStoresPage, loadingNow: true });
    let url = `${import.meta.env.VITE_URL}/admin/stores/all?`;
    let andMark = false;
    await Promise.all(
      Object.keys(filter).map((filterKey) => {
        if (filter[filterKey] != -1 && filter[filterKey] !== "") {
          if (andMark) url += `&`;
          url += `${filterKey}=${filter[filterKey]}`;
          andMark = true;
        }
      })
    );
    if (andMark) url += `&`;
    url += `page=${pendingStoresPage.page}`;
    andMark = true;
    if (andMark) url += `&`;
    url += `size=${pendingStoresPage.size}`;
    let response = await fetch(url, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      if (!data.data.length) {
        setPendingStoresPage({ ...pendingStoresPage, search: false, loadMore: false, loadingNow: false, OnlyClick: false });
        if (pendingStores == -1 || pendingStoresPage.page == 1) setPendingStores({});
      } else {
        let finalPendingStores = {};
        await Promise.all(
          data.data.map(async (pendingStore) => {
            finalPendingStores[pendingStore.id] = { ...pendingStore };
          })
        );

        if (pendingStoresPage.page == 1) setPendingStores({ ...finalPendingStores });
        else setPendingStores({ ...pendingStores, ...finalPendingStores });

        setPendingStoresPage({ ...pendingStoresPage, search: false, page: pendingStoresPage.page + 1, loadMore: true, loadingNow: false, OnlyClick: false });
      }
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getPendingStores({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setPendingStores, pendingStores, toast, filter, pendingStoresPage, setPendingStoresPage);
      } else {
        setPendingStoresPage({ ...pendingStoresPage, search: false, loadingNow: false, OnlyClick: true });
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    setPendingStoresPage({ ...pendingStoresPage, search: false, loadingNow: false, OnlyClick: true });
    console.log(err);
  }
}
