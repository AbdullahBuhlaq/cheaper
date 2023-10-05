import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getCategories(userInformation, setUserInformation, refreshStatus, setRefreshStatus, setCategories, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/category/all`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let finalCategories = {};
      await Promise.all(
        data.data.map(async (category) => {
          finalCategories[category.id] = category;
        })
      );
      setCategories({ ...finalCategories });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getCategories({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setCategories, toast);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
