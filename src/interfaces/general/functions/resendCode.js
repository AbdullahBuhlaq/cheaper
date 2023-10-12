import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";

async function resendCode(profile, toast, userInformation, setUserInformation, refreshStatus, setRefreshStatus) {
  try {
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      method: "put",
      body: JSON.stringify({
        newEmail: profile.userInformation.email,
      }),
    };

    console.log(profile.userInformation.email);

    const response = await fetch(`${import.meta.env.VITE_URL}/account/resend`, infoRequestOptions);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      //   setProfile({ ...profile, email: newData.newEmail });

      toast.success("تمت إعادة إرسال الكود.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await resendCode(profile, toast, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    console.log(err);
    toast.error("عذرا حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default resendCode;
