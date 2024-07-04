import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function addPack(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast,
  packs,
  setPacks,
  pack,
  setDuringAdd,
  setAddNew
) {
  try {
    const newData = pack;
    const infoRequestOptions = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
      body: JSON.stringify({
        ...pack,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(
      `${import.meta.env.VITE_URL}/admin/packs/create`,
      infoRequestOptions
    );
    const data = await response.json();
    if (data.success) {
      setPacks({ ...packs, [data.data]: { id: data.data, ...newData } });
      toast.success("تمت إضافة الباقة بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setAddNew(false);
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await addPack(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast,
          packs,
          setPacks,
          pack,
          setDuringAdd,
          setAddNew
        );
      } else {
        console.log(data.message);
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    setDuringAdd(false);
  } catch (err) {
    setDuringAdd(false);
    console.log(err);
    toast.error("عذرا حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default addPack;
