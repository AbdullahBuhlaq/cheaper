import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

async function updateDiscount(
  setDuringAdd,
  setNewDiscount,
  setStoreInformation,
  storeInformation,
  id,
  discount,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast
) {
  try {
    setDuringAdd(true);
    let response = await fetch(
      `${
        import.meta.env.VITE_URL
      }/store/packs/update?id=${id}&discount=${discount}`,
      {
        ...requestOptions,
        method: "put",
        headers: {
          ...requestOptions.headers,
          authorization: userInformation.token,
        },
      }
    );
    let data = await response.json();
    if (data.success) {
      setStoreInformation({
        ...storeInformation,
        packs: {
          ...storeInformation.packs,
          [id]: { ...storeInformation.packs[id], discount: discount },
        },
      });
      setDuringAdd(false);
      setNewDiscount(0);
      toast.success("تم تحديث نسبة الحسم", {
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
        await updateDiscount(
          setDuringAdd,
          setNewDiscount,
          setStoreInformation,
          storeInformation,
          id,
          discount,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
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
    toast.error("عذرا, حصل خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default updateDiscount;
