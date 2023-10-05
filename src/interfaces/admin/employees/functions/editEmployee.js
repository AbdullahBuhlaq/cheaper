import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function editEmployee(employee, currentEdit, setDuringAdd, image, userInformation, setUserInformation, refreshStatus, setRefreshStatus, setEmployees, employees, setCurrentEdit, toast) {
  try {
    const newData = employee;
    const id = currentEdit.id;
    const url = `${import.meta.env.VITE_URL}/admin/employee/update/${id}`;

    const infoRequestOptions = {
      ...requestOptions,
      method: "put",
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      body: JSON.stringify({
        ...employee,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/employee/update/${id}`, infoRequestOptions);
    const data = await response.json();

    if (data.success) {
      setEmployees({ ...employees, [id]: { ...employees[id], ...newData } });
      setCurrentEdit(false);
      toast.success("تم تعديل الموظف", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await editEmployee(employee, currentEdit, setDuringAdd, image, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setEmployees, employees, setCurrentEdit, toast);
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
    toast.error("عذرا, حصل خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default editEmployee;
