import { useNavigate } from "react-router-dom";
import requestOptions from "../constants/requestOptions";
import refreshToken from "./refreshToken";
// import refreshToken from "./refreshToken";
import Refresh from "./refreshToken";

async function getProfile(setProfile, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/account/profile`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();

    if (data.success) {
      setProfile({ ...data.data });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getProfile(setProfile, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast);
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

export default getProfile;
