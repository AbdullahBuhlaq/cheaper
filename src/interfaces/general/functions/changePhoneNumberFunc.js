import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";

async function changePhoneNumberFunc(changePhoneNumber, setDuringAdd, setProfile, profile, toast, setEdit, userInformation, setUserInformation, refreshStatus, setRefreshStatus) {
  try {
    const newData = changePhoneNumber;

    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      method: "put",
      body: JSON.stringify({
        ...changePhoneNumber,
      }),
    };

    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/account/ch-phone`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setProfile({ ...profile, phoneNumber: newData.phoneNumber });
      setEdit(false);
      toast.success("تم التعديل بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await changePhoneNumberFunc(changePhoneNumber, setDuringAdd, setProfile, profile, toast, setEdit, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
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

export default changePhoneNumberFunc;
