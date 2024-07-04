import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";

async function changePasswordFunc(
  changePassword,
  setDuringAdd,
  setProfile,
  profile,
  setEdit,
  toast,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus
) {
  try {
    const newData = changePassword;

    const infoRequestOptions = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
      method: "put",
      body: JSON.stringify({
        ...changePassword,
      }),
    };

    setDuringAdd(true);
    const response = await fetch(
      `${import.meta.env.VITE_URL}/account/ch-pass`,
      infoRequestOptions
    );
    const data = await response.json();
    if (data.success) {
      setProfile({ ...profile, password: newData.newPassword });
      setEdit(false);
      toast.success("تم التعديل بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await changePasswordFunc(
          changePassword,
          setDuringAdd,
          setProfile,
          profile,
          setEdit,
          toast,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus
        );
      } else {
        console.log(data.message);
        toast.error(data.message, {
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

export default changePasswordFunc;
