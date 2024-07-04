import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function addEmployee(
  employee,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  setDuringAdd,
  setEmployees,
  employees,
  toast,
  setAddNew
) {
  try {
    const newData = employee;

    const infoRequestOptions = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
      body: JSON.stringify({
        ...employee,
        roleId: +employee.roleId,
      }),
    };

    setDuringAdd(true);
    const response = await fetch(
      `${import.meta.env.VITE_URL}/admin/employee/create`,
      infoRequestOptions
    );
    const data = await response.json();

    if (data.success) {
      setEmployees({
        ...employees,
        [data.data]: { id: data.data, ...newData },
      });
      toast.success("تمت إضافة الموظف بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setAddNew(false);
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await addEmployee(
          employee,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          setDuringAdd,
          setEmployees,
          employees,
          toast,
          setAddNew
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

export default addEmployee;
