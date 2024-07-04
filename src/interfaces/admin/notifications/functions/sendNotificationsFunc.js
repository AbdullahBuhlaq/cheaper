import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function sendNotificationsFunc(
  sendData,
  type,
  obj,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  setDuringAdd,
  toast
) {
  try {
    const newData = obj;
    const infoRequestOptions = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
      body: JSON.stringify({
        ...sendData,
      }),
    };
    let url = `${
      import.meta.env.VITE_URL
    }/admin/notification/send?type=${type}`;
    await Promise.all(
      Object.keys(obj).map((filterKey) => {
        if (obj[filterKey] != -1 && filterKey != "categories") {
          url += `&${filterKey}=${obj[filterKey]}`;
        }
      })
    );
    await Promise.all(
      obj["categories"].map((cat) => {
        url += `&categories[]=${cat}`;
      })
    );
    setDuringAdd(true);
    const response = await fetch(url, infoRequestOptions);
    const data = await response.json();

    if (data.success) {
      toast.success("تم إرسال الإشعارات بنجاح.", {
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
        await sendNotificationsFunc(
          sendData,
          type,
          obj,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          setDuringAdd,
          toast
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

export default sendNotificationsFunc;
