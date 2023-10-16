import requestOptions from "../constants/requestOptions";
import refreshToken from "./refreshToken";

async function logoutDevice(id, setProfile, profile, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast) {
  try {
    let url = `${import.meta.env.VITE_URL}/account/logoutDevice/${id}`;

    let response = await fetch(url, { ...requestOptions, method: "put", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    // let data = { success: true };

    if (data.success) {
      let finalDevices = [];
      await Promise.all(
        profile.devices.map((item) => {
          if (item.id != id) finalDevices = [...finalDevices, item];
        })
      );
      setProfile({ ...profile, devices: [...finalDevices] });
      toast.success("تم تسجيل الخروج من الجهاز بنجاح", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await logoutDevice(id, setProfile, profile, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    console.log(err);
    toast.error("عذرا حصل خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default logoutDevice;
