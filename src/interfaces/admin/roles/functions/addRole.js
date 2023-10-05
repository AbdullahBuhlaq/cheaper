import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function addRole(role, userInformation, setUserInformation, refreshStatus, setRefreshStatus, setDuringAdd, setRoles, roles, setCurrentEdit, toast) {
  try {
    const newData = role;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      body: JSON.stringify({
        ...role,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/role/create`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setRoles({ ...roles, [data.data]: { id: data.data, ...newData } });
      setCurrentEdit(false);
      toast.success("تمت إضافة الدور", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await addRole(role, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setDuringAdd, setRoles, roles, setCurrentEdit, toast);
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
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default addRole;
