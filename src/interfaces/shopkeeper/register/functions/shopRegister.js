import requestOptions from "../../../../constants/requestOptions";
import getDeviceToken from "../../../../functions/getDeviceToken";
import { shopkeeperInitialPermissions } from "../../../../constants/initialPermissions";
import secureLocalStorage from "react-secure-storage";

async function shopRegister(shopkeeper, toast, navigate, setDuringAdd, city) {
  try {
    const newData = shopkeeper;

    let tokenDevice = await getDeviceToken(toast);
    if (!tokenDevice) return;
    const infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        ...shopkeeper,
        city: city.city,
        mac_key: "web",
        tokenDevice,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(
      `${import.meta.env.VITE_URL}/auth/signup-manger`,
      infoRequestOptions
    );
    const data = await response.json();
    if (data.success) {
      secureLocalStorage.setItem(
        "userInformation",
        JSON.stringify({
          ...data.data,
          ...shopkeeperInitialPermissions,
          typeUser: "مدير محل جديد",
        })
      );
      toast.success(
        "تم إرسال طلب التسجيل, يرجى الانتظار حتى مراجعة الطلب وقبوله.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      navigate("/main");
    } else {
      console.log(data.message);
      toast.error(data.message, {
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

export default shopRegister;
