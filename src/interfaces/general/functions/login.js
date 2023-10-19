import requestOptions from "../../../constants/requestOptions";
import getDeviceToken from "../../../functions/getDeviceToken";
import secureLocalStorage from "react-secure-storage";
import jsonParse from "../../../functions/jsonParse";

async function login(user, toast, setDuringAdd, navigate) {
  try {
    setDuringAdd(true);
    const newData = user;
    let tokenDevice = await getDeviceToken(toast);
    if (!tokenDevice) {
      setDuringAdd(false);
      return;
    }
    const infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        ...user,
        tokenDevice,
      }),
    };
    const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      secureLocalStorage.setItem("userInformation", JSON.stringify({ ...data.data, allPermission: jsonParse(data.data.allPermission), typeUser: jsonParse(data.data.allPermission)["action"][0][0] == "u" ? "مستخدم" : jsonParse(data.data.allPermission)["action"][0][0] == "a" ? "مدير" : data.data.typeUser }));
      toast.success("أهلا وسهلا!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/main");
    } else {
      console.log(data.error);
      toast.error(data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setDuringAdd(false);
  } catch (err) {
    console.log(err);
    toast.error("حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
    setDuringAdd(false);
  }
}

export default login;
