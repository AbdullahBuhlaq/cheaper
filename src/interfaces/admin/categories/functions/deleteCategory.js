import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function deleteCategory(
  id,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  categories,
  setCategories,
  toast
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/admin/category/delete/${id}`,
      {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          authorization: userInformation.token,
        },
        method: "delete",
      }
    );
    const data = await response.json();
    if (data.success) {
      delete categories[id];
      setCategories({ ...categories });
      toast.success("تم حذف التصنيف", {
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
        await deleteCategory(
          id,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          categories,
          setCategories,
          toast
        );
      } else {
        console.log(data.message);
        toast.error(data.message, {
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
