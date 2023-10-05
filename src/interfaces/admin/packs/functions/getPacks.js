import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function getPacks(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setPacks) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/packs/all`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let finalPacks = {};
      await Promise.all(
        data.data.map(async (pack) => {
          finalPacks[pack.id] = pack;
        })
      );
      setPacks({ ...finalPacks });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getPacks({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setPacks);
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

export default getPacks;
