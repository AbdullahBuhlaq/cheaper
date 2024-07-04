import requestOptions from "../constants/requestOptions";
import refreshToken from "./refreshToken";

async function getPermissions(
  setPermissions,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast
) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_URL}/account/myPermission`,
      {
        ...requestOptions,
        method: "get",
        headers: {
          ...requestOptions.headers,
          authorization: userInformation.token,
        },
      }
    );
    let data = await response.json();
    if (data.success) {
      setPermissions({ ...data.data });
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getPermissions(
          setPermissions,
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

export default getPermissions;
