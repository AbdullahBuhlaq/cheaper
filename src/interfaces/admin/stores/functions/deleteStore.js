import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function deleteStore(
  id,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast,
  acceptedStores,
  setAcceptedStores,
  pendingStores,
  setPendingStores,
  setCurrentEdit
) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_URL}/admin/stores/disable/${id}`,
      {
        ...requestOptions,
        method: "delete",
        headers: {
          ...requestOptions.headers,
          authorization: userInformation.token,
        },
      }
    );
    let data = await response.json();
    // let data = { success: true };
    if (data.success) {
      delete pendingStores[id];
      setPendingStores({ ...pendingStores });
      setCurrentEdit(false);
      toast.success("تم حذف المحل", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await deleteStore(
          id,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast,
          acceptedStores,
          setAcceptedStores,
          pendingStores,
          setPendingStores,
          setCurrentEdit
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
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default deleteStore;
