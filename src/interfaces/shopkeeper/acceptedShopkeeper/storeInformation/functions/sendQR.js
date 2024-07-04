import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

async function sendQR(
  qr,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast
) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/store/verifyQR`, {
      ...requestOptions,
      method: "put",
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
      body: JSON.stringify({ qr: qr }),
    });
    let data = await response.json();
    if (data.success) {
      //   setProfile({ ...data.data });
      toast.success("تم مسح الكود بنجاح", {
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
        await sendQR(
          qr,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
      } else {
        console.log(data.message);
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default sendQR;
