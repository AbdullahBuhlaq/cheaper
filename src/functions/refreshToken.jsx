import requestOptions from "../constants/requestOptions";
import secureLocalStorage from "react-secure-storage";

let status = "done";
let refPromise = null;

async function refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast) {
  try {
    if (status == "wait") {
      const res = await refPromise;
      const finalData = await res.clone().json();
      return finalData.data;
    }
    status = "wait";

    const infoRequestOptions = {
      ...requestOptions,
      method: "put",
      body: JSON.stringify({
        refreshToken: userInformation.refreshToken,
      }),
    };

    refPromise = fetch(`${import.meta.env.VITE_URL}/auth/refreshToken`, infoRequestOptions);
    let response = await refPromise;
    const data = await response.clone().json();

    if (data.success) {
      setUserInformation({ ...userInformation, ...data.data });
      secureLocalStorage.setItem("userInformation", JSON.stringify({ ...userInformation, ...data.data }));
      status = "done";
      refPromise = null;
      return data.data;
    } else {
      window.location.replace(`http://localhost:5173/login`);
    }
  } catch (err) {
    console.log(err);
  }
}

export default refreshToken;
