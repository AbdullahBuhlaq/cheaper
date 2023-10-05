import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getUserProfile(userInformation, setUserInformation, refreshStatus, setRefreshStatus, id, setUserProfile, userProfile, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/users/information/${id}`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      setUserProfile({ ...data.data });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getUserProfile({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, id, setUserProfile, userProfile, toast);
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
