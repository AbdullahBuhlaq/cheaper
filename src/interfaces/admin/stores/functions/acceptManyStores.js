import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function acceptManyStores(
  setDuringAdd,
  selected,
  setSelected,
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
    setDuringAdd(true);
    let url = `${import.meta.env.VITE_URL}/admin/stores/accept?`;
    await Promise.all(
      selected.map((item, index) => {
        url = url + `${index > 0 ? "&" : ""}ids[]=${+item.id}`;
      })
    );
    let response = await fetch(url, {
      ...requestOptions,
      method: "put",
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
    });
    let data = await response.json();
    // let data = { success: true };
    if (data.success) {
      let newStores = {};
      await Promise.all(
        selected.map((item) => {
          newStores = { ...newStores, [item.id]: { ...item } };
          delete pendingStores[item.id];
        })
      );
      setAcceptedStores({ ...acceptedStores, ...newStores });
      setPendingStores({ ...pendingStores });
      setSelected(false);
      setDuringAdd(false);
      toast.success("تم قبول المحلات", {
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
        await acceptManyStores(
          setDuringAdd,
          selected,
          setSelected,
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
        setDuringAdd(false);
        console.log(data.message);
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    setDuringAdd(false);
    console.log(err);
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default acceptManyStores;
