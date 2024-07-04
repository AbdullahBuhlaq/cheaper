import { useNavigate } from "react-router-dom";
import requestOptions from "../constants/requestOptions";
import refreshToken from "./refreshToken";
// import refreshToken from "./refreshToken";
import Refresh from "./refreshToken";
import jsonParse from "./jsonParse";

async function getProfile(
  setProfile,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast
) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/account/profile`, {
      ...requestOptions,
      method: "get",
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
    });
    let data = await response.json();

    if (data.success) {
      setProfile({
        ...data.data,
        userInformation: {
          ...data.data.userInformation,
          settings: { ...jsonParse(data.data.userInformation.settings) },
        },
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
        await getProfile(
          setProfile,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
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
    console.log(err);
  }
}

export default getProfile;
