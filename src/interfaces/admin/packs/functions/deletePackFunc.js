import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function deletePackFunc(id, userInformation, setUserInformation, refreshStatus, setRefreshStatus, packs, setPacks, toast) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/packs/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: userInformation.token }, method: "delete" });
    const data = await response.json();
    if (data.success) {
      delete packs[id];
      setPacks({ ...packs });
      toast.success("تم حذف الباقة", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await deletePackFunc(id, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, packs, setPacks, toast);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
    console.log(err);
  }
}

export default deletePackFunc;
