import requestOptions from "../constants/requestOptions";
import secureLocalStorage from "react-secure-storage";
import jsonParse from "./jsonParse";

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
      setUserInformation({ ...userInformation, ...data.data, typeUser: jsonParse(data.data.allPermission)["action"][0][0] == "u" ? "مستخدم" : jsonParse(data.data.allPermission)["action"][0][0] == "a" ? "مدير" : data.data.typeUser });
      secureLocalStorage.setItem("userInformation", JSON.stringify({ ...userInformation, ...data.data, typeUser: jsonParse(data.data.allPermission)["action"][0][0] == "u" ? "مستخدم" : jsonParse(data.data.allPermission)["action"][0][0] == "a" ? "مدير" : data.data.typeUser }));
      status = "done";
      refPromise = null;
      let newType = jsonParse(data.data.allPermission)["action"][0][0] == "u" ? "مستخدم" : jsonParse(data.data.allPermission)["action"][0][0] == "a" ? "مدير" : data.data.typeUser;
      if (userInformation.typeUser != newType) window.location.replace(`${import.meta.env.VITE_LOCAL_URL}/main`);
      return data.data;
    } else {
      window.location.replace(`${import.meta.env.VITE_LOCAL_URL}/login`);
    }
  } catch (err) {
    console.log(err);
  }
}

export default refreshToken;
