import axios from "axios";
import refreshToken from "../../../../functions/refreshToken";

async function updateUserFunc(user, image, userInformation, profile, setProfile, toast, setDuringAdd, setEdit) {
  try {
    const newData = user;
    const url = `${import.meta.env.VITE_URL}/account/update`;

    setDuringAdd(true);
    let formData = new FormData();
    if (image) formData.append("avatar", image);
    Object.keys(newData).map((key) => {
      const value = newData[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else {
        formData.append(key, value);
      }
    });

    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: userInformation.token,
      },
    });
    const data = response.data;

    if (data.success) {
      let finalCats = [];
      await Promise.all(
        newData.category.map((cat) => {
          finalCats = [...finalCats, { name: cat, emoji: "" }];
        })
      );
      delete newData.category;
      setProfile({ ...profile, userInformation: { ...newData, avatar: newData.imageStatus == "same" ? profile.userInformation.avatar : data.data }, category: finalCats });
      setEdit(false);
      toast.success("تم التعديل بنجاح", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      toast.error(data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setDuringAdd(false);
  } catch (err) {
    if (err.name == "AxiosError") {
      if (err.response.data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await updateUserFunc(user, image, { ...userInformation, ...status }, profile, setProfile, toast, setDuringAdd, setEdit);
      } else {
        setDuringAdd(false);
        console.log(err.response.data.error);
        toast.error(err.response.data.error, {
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

export default updateUserFunc;
