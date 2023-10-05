import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

async function getStoreInformation(setProfile, packsChart, setPacksChart, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/store`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let ser1 = [],
        ser2 = [],
        cats = [],
        finalPacks = {};
      await Promise.all(
        data.data.packs.map((item) => {
          ser1 = [...ser1, item.count.paid];
          ser2 = [...ser2, item.count.notPaid];
          cats = [...cats, item["pack.name"]];
          finalPacks[item.id] = item;
        })
      );
      setPacksChart({
        ...packsChart,
        loading: false,
        options: {
          ...packsChart.options,
          xaxis: {
            categories: cats,
          },
        },
        series: [
          {
            name: "تم الشراء",
            data: ser1,
          },
          {
            name: "لم يتم الشراء",
            data: ser2,
          },
        ],
      });
      setProfile({ ...data.data, packs: finalPacks });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getStoreInformation(setProfile, packsChart, setPacksChart, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast);
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

export default getStoreInformation;
