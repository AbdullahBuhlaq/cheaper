import axios from "axios";
import refreshToken from "../../../../functions/refreshToken";

async function updateUserTop(
  user,
  currentEdit,
  setDuringAdd,
  image,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  users,
  setUsers,
  toast,
  setCurrentEdit
) {
  try {
    const newData = user;
    const id = currentEdit.id;
    const url = `${import.meta.env.VITE_URL}/admin/users/update/${id}`;

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
    // const data = { success: true };
    if (data.success) {
      console.log(data);
      let finalCats = [];
      await Promise.all(
        newData.category.map((cat) => {
          finalCats = [...finalCats, { name: cat, emoji: "" }];
        })
      );
      setUsers({
        ...users,
        [id]: {
          ...users[id],
          category: finalCats,
          ...newData,
          avatar: newData.imageStatus == "same" ? users[id].avatar : data.data,
        },
      });
      setCurrentEdit(false);
      toast.success("تم تعديل المستخدم", {
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
        await updateUserTop(
          user,
          currentEdit,
          setDuringAdd,
          image,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          users,
          setUsers,
          toast,
          setCurrentEdit
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
      toast.error("عذرا, حصل خطأ ما", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
}

export default updateUserTop;
