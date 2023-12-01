import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";

async function verifyEmail(setEdit, profile, setProfile, setStatus, code, toast, userInformation, setUserInformation, refreshStatus, setRefreshStatus) {
  try {
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      method: "get",
    };

    const response = await fetch(`${import.meta.env.VITE_URL}/account/verify?code=${code}`, infoRequestOptions);
    console.log(code);
    const data = await response.json();
    if (data.success) {
      //   setProfile({ ...profile, email: newData.newEmail });
      if (profile != -1) {
        setProfile({ ...profile, userInformation: { ...profile.userInformation, settings: { ...profile.userInformation.settings, verify: { ...profile.userInformation.settings.verify, email: true } } } });
      }
      setStatus("done");
      setEdit(false);
      toast.success("تم تأكيد الإيميل بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await verifyEmail(setEdit, profile, setProfile, setStatus, code, toast, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus);
      } else {
        setStatus(data.error);
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    setStatus("عذرا حدث خطأ ما");
    console.log(err);
    toast.error("عذرا حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default verifyEmail;
