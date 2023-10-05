import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function editPack(pack, currentEdit, setDuringAdd, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setPacks, setCurrentEdit, packs) {
  try {
    const newData = pack;
    const id = currentEdit.id;
    const infoRequestOptions = {
      ...requestOptions,
      method: "put",
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      body: JSON.stringify({
        ...pack,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/packs/update/${id}`, infoRequestOptions);
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      setPacks({ ...packs, [id]: { ...packs[id], ...newData } });
      setCurrentEdit(false);
      toast.success("تم تعديل الباقة", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await editPack(pack, currentEdit, setDuringAdd, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setPacks, setCurrentEdit, packs);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    setDuringAdd(false);
  } catch (err) {
    setDuringAdd(false);
    console.log(err);
    toast.error("عذرا, حصل خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default editPack;
