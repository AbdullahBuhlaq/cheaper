import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function editCategory(category, currentEdit, userInformation, setUserInformation, refreshStatus, setRefreshStatus, categories, setDuringAdd, setCurrentEdit, setCategories, toast) {
  try {
    const newData = category;
    const id = currentEdit.id;
    const infoRequestOptions = {
      ...requestOptions,
      method: "put",
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      body: JSON.stringify({
        ...category,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/category/update/${id}`, infoRequestOptions);
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      setCategories({ ...categories, [id]: { ...categories[id], ...newData } });
      setCurrentEdit(false);
      toast.success("تم تعديل الصنف", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await editCategory(category, currentEdit, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, categories, setDuringAdd, setCurrentEdit, setCategories, toast);
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
