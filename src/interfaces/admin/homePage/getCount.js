import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";

export default async function getCount(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeCount, setHomeUserChart, homeUserChart, setHomeStoreChart, homeStoreChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      setHomeUserChart((homeUserChart) => ({ ...homeUserChart, value: data.data.countUser, loadingValue: false }));
      setHomeStoreChart((homeStoreChart) => ({ ...homeStoreChart, value: data.data.countStore, loadingValue: false }));
      // setHomeCount({ ...data.data });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getCount({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeCount, setHomeUserChart, homeUserChart, setHomeStoreChart, homeStoreChart);
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
