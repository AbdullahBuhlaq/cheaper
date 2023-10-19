import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getAcceptedStores(userInformation, setUserInformation, refreshStatus, setRefreshStatus, setAcceptedStores, acceptedStores, toast, filter, acceptedStoresPage, setAcceptedStoresPage) {
  try {
    setAcceptedStoresPage({ ...acceptedStoresPage, loadingNow: true });
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
    url += `page=${acceptedStoresPage.page}`;
    andMark = true;
    if (andMark) url += `&`;
    url += `size=${acceptedStoresPage.size}`;
    let response = await fetch(url, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      if (!data.data.length) {
        setAcceptedStoresPage({ ...acceptedStoresPage, search: false, loadMore: false, loadingNow: false, OnlyClick: false });
        if (acceptedStores == -1 || acceptedStoresPage.page == 1) setAcceptedStores({});
      } else {
        let finalAcceptedStores = {};
        await Promise.all(
          data.data.map(async (acceptedStore) => {
            finalAcceptedStores[acceptedStore.id] = { ...acceptedStore };
          })
        );

        if (acceptedStoresPage.page == 1) setAcceptedStores({ ...finalAcceptedStores });
        else setAcceptedStores({ ...acceptedStores, ...finalAcceptedStores });

        setAcceptedStoresPage({ ...acceptedStoresPage, search: false, page: acceptedStoresPage.page + 1, loadMore: true, loadingNow: false, OnlyClick: false });
      }
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getAcceptedStores({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setAcceptedStores, acceptedStores, toast, filter, acceptedStoresPage, setAcceptedStoresPage);
      } else {
        setAcceptedStoresPage({ ...acceptedStoresPage, search: false, loadingNow: false, OnlyClick: true });
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    setAcceptedStoresPage({ ...acceptedStoresPage, search: false, loadingNow: false, OnlyClick: true });
    console.log(err);
  }
}
