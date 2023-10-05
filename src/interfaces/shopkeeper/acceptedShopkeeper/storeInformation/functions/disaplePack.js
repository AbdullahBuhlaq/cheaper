import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

async function disablePack(setStoreInformation, storeInformation, id, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/store/packs/delete/${id}`, { ...requestOptions, method: "delete", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      setStoreInformation({ ...storeInformation, packs: { ...storeInformation.packs, [id]: { ...storeInformation.packs[id], deletedAt: new Date().toISOString() } } });
      toast.success("تم إلغاء الباقة", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await disablePack(setStoreInformation, storeInformation, id, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    console.log(err);
    toast.error("عذرا, حصل خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default disablePack;
