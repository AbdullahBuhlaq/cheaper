import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function getEmployees(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setEmployees) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/employee/all`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let finalEmployees = {};
      await Promise.all(
        data.data.map(async (employee) => {
          finalEmployees[employee.id] = { ...employee, roleId: employee["role.id"] };
        })
      );
      setEmployees({ ...finalEmployees });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getEmployees({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setEmployees);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default getEmployees;
