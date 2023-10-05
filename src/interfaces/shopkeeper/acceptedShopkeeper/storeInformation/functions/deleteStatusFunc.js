import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

async function deleteStatusFunc(setDuringAdd, image, userInformation, setUserInformation, refreshStatus, setRefreshStatus, setStoreInformation, storeInformation, setEdit, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/store/delete-story/${image}`, { ...requestOptions, method: "delete", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let newSotry = [];
      await Promise.all(
        storeInformation.story.map((item) => {
          if (item.id != image) newSotry = [...newSotry, item];
        })
      );
      setStoreInformation({ ...storeInformation, story: newSotry });
      toast.success("تم حذف الحالة", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await deleteStatusFunc(setDuringAdd, image, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setStoreInformation, storeInformation, setEdit, toast);
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

export default deleteStatusFunc;
