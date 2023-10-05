import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";

async function changeEmailFunc(changeEmail, setDuringAdd, setProfile, setEdit, toast, profile, userInformation, setUserInformation, refreshStatus, setRefreshStatus) {
  try {
    const newData = changeEmail;

    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      method: "put",
      body: JSON.stringify({
        ...changeEmail,
      }),
    };

    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/account/ch-email`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setProfile({ ...profile, email: newData.newEmail });
      setEdit(false);
      toast.success("تم التعديل بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await changeEmailFunc(changeEmail, setDuringAdd, setProfile, setEdit, toast, profile, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus);
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

export default changeEmailFunc;
