import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function editConfig(config, setDuringAdd, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setConfigs, setCurrentEdit, configs) {
  try {
    const newData = config;
    await Promise.all(
      Object.keys(newData).map((itemKey) => {
        newData[itemKey] = +newData[itemKey];
      })
    );
    const infoRequestOptions = {
      ...requestOptions,
      method: "put",
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      body: JSON.stringify({
        ...newData,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/config/update`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setConfigs({ ...configs, ...newData });
      setCurrentEdit(false);
      toast.success("تم تعديل المعلومات", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await editConfig(config, setDuringAdd, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setConfigs, setCurrentEdit, configs);
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

export default editConfig;
