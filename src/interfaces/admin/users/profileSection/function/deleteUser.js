import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

async function deleteUserFunc2(id, userInformation, setUserInformation, refreshStatus, setRefreshStatus, users, setUsers, toast) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/users/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: userInformation.token }, method: "delete" });
    const data = await response.json();
    if (data.success) {
      // delete users[id];
      setUsers({ ...users, information: { ...users.information, disableAt: new Date().toISOString() } });
      toast.success("تم حذف المستخدم", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, users, setUsers, toast);
        await deleteUserFunc2(id, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
    console.log(err);
  }
}

export default deleteUserFunc2;
