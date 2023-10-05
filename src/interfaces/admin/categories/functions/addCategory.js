import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function addCategory(category, userInformation, setUserInformation, refreshStatus, setRefreshStatus, setDuringAdd, setAddNew, categories, setCategories, toast) {
  try {
    const newData = category;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      body: JSON.stringify({
        ...category,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/category/create`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setCategories({ ...categories, [data.data]: { id: data.data, ...newData, count: { offerTaken: 0, user: 0, store: 0 } } });
      toast.success("تمت إضافة التصنيف بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setAddNew(false);
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await addCategory(category, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setDuringAdd, setAddNew, categories, setCategories, toast);
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
    toast.error("عذرا حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}
