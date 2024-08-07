import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getInformation(
  id,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast,
  setInformation
) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_URL}/admin/stores/information/${id}`,
      {
        ...requestOptions,
        method: "get",
        headers: {
          ...requestOptions.headers,
          authorization: userInformation.token,
        },
      }
    );
    let data = await response.json();
    if (data.success) {
      setInformation({ ...data.data });
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getInformation(
          id,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast,
          setInformation
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
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}
