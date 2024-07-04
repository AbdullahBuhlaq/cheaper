import axios from "axios";
import refreshToken from "../../../../../functions/refreshToken";

async function updateImage(
  setDuringAdd,
  image,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  setProfile,
  profile,
  setEdit,
  toast
) {
  try {
    const url = `${import.meta.env.VITE_URL}/store/upload`;

    setDuringAdd(true);
    let formData = new FormData();
    if (image) formData.append("avatar", image);
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: userInformation.token,
      },
    });
    const data = response.data;

    if (data.success) {
      setProfile({
        ...profile,
        information: { ...profile.information, avatar: data.data },
      });
      setEdit(false);
      toast.success("تم التعديل بنجاح", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.message);
      toast.error(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setDuringAdd(false);
  } catch (err) {
    if (err.name == "AxiosError") {
      if (err.response.data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await updateImage(
          setDuringAdd,
          image,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          setProfile,
          profile,
          setEdit,
          toast
        );
      } else {
        setDuringAdd(false);
        console.log(err.response.data.message);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      setDuringAdd(false);
      console.log(err);
      toast.error("عذرا حدث خطأ ما", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
}

export default updateImage;
