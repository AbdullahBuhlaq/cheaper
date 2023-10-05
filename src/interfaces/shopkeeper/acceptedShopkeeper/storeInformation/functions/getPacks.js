import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

async function getPacks(setProfile, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/store/packs`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      // setProfile({ ...data.data });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getPacks(setProfile, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast);
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

export default getPacks;
