import requestOptions from "../../../../constants/requestOptions";
import getDeviceToken from "../../../../functions/getDeviceToken";
import secureLocalStorage from "react-secure-storage";
import { userInitialPermissions } from "../../../../constants/initialPermissions";
async function registerUser(user, toast, navigate, setDuringAdd) {
  try {
    const newData = user;

    let tokenDevice = await getDeviceToken(toast);
    if (!tokenDevice) return;
    const infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        ...user,
        tokenDevice,
        mac_key: "web",
      }),
    };
    setDuringAdd(true);
    const response = await fetch(
      `${import.meta.env.VITE_URL}/auth/signup`,
      infoRequestOptions
    );
    const data = await response.json();
    if (data.success) {
      secureLocalStorage.setItem(
        "userInformation",
        JSON.stringify({
          ...data.data,
          ...userInitialPermissions,
          typeUser: "مستخدم",
        })
      );
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
    setDuringAdd(false);
    console.log(err);
    toast.error("عذرا حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default registerUser;
