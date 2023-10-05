import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function deleteRoleFunc(id, userInformation, setUserInformation, refreshStatus, setRefreshStatus, roles, employees, setEmployees, setRoles, setCurrentEdit, toast) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/role/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: userInformation.token }, method: "delete" });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete roles[id];
      if (employees != -1) {
        Object.keys(employees).map((employee) => {
          if (employees[employee].roleId == id) {
            delete employees[employee];
          }
        });
        setEmployees({ ...employees });
      }
      setRoles({ ...roles });
      setCurrentEdit(roles[Object.keys(roles)[0]]);
      toast.success("تم حذف الدور", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await deleteRoleFunc(id, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, roles, employees, setEmployees, setRoles, setCurrentEdit, toast);
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

export default deleteRoleFunc;
