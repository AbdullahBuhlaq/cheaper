import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getUserStores(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  id,
  storeId,
  setUserStores,
  userStores,
  toast
) {
  try {
    let response = await fetch(
      `${
        import.meta.env.VITE_URL
      }/admin/users/info-storeOffer?userId=${id}&id=${storeId}`,
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
    if (data.success) {
      //   setUserStores({ ...data.data });
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getUserStores(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          id,
          storeId,
          setUserStores,
          userStores,
          toast
        );
      } else {
        console.log(data.message);
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
