import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

async function addNewPackFunc(
  setEdit,
  setDuringAdd,
  setStoreInformation,
  storeInformation,
  pack,
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
      `${import.meta.env.VITE_URL}/store/packs/choose?packId=${
        pack.id
      }&discount=${discount}`,
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
          [data.data]: {
            cost: pack.price,
            count: { paid: 0, notPaid: 0 },
            createdAt: new Date().toISOString(),
            deletedAt: null,
            discount: discount,
            id: data.data,
            "pack.duration": pack.duration,
            "pack.name": pack.name,
          },
        },
      });
      toast.success("تم إضافة الباقة", {
        position: toast.POSITION.TOP_CENTER,
      });
      setDuringAdd(false);
      setEdit(false);
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await addNewPackFunc(
          setEdit,
          setDuringAdd,
          setStoreInformation,
          storeInformation,
          pack,
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

export default addNewPackFunc;
