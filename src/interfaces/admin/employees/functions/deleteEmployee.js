import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function deleteEmployeeFunc(
  id,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  employees,
  setEmployees,
  toast
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/admin/employee/delete/${id}`,
      {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          authorization: userInformation.token,
        },
        method: "delete",
      }
    );
    const data = await response.json();
    if (data.success) {
      delete employees[id];
      setEmployees({ ...employees });
      toast.success("تم حذف الموظف", {
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
        await deleteEmployeeFunc(
          id,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          employees,
          setEmployees,
          toast
        );
      } else {
        console.log(data.message);
        toast.error(data.message, {
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

export default deleteEmployeeFunc;
