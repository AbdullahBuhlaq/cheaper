import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";
import jsonParse from "../../../../functions/jsonParse";
async function getRoles(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast,
  setRoles
) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/role/all`, {
      ...requestOptions,
      method: "get",
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
    });
    let data = await response.json();
    console.log(data);
    if (data.success) {
      let finalRoles = {};
      await Promise.all(
        data.data.map(async (role) => {
          let data = { id: role.id, name: role.name, ...jsonParse(role.data) };
          finalRoles[role.id] = data;
        })
      );
      setRoles({ ...finalRoles });
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getRoles(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast,
          setRoles
        );
      } else {
        console.log(data.message);
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default getRoles;
