import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function editRole(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  role,
  setDuringAdd,
  setRoles,
  roles,
  currentEdit,
  toast
) {
  try {
    const newData = role;
    const id = currentEdit.id;
    const infoRequestOptions = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
      method: "put",
      body: JSON.stringify({
        ...role,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(
      `${import.meta.env.VITE_URL}/admin/role/update/${id}`,
      infoRequestOptions
    );
    const data = await response.json();
    if (data.success) {
      setRoles({ ...roles, [id]: { id: id, ...newData } });
      toast.success("تم تعديل الدور ", {
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
        await editRole(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          role,
          setDuringAdd,
          setRoles,
          roles,
          currentEdit,
          toast
        );
      } else {
        setDuringAdd(false);
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
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default editRole;
