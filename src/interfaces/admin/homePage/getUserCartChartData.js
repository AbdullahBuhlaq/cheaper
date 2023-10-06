import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";

export default async function getUserCartChart(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeUserCartChart, homeUserCartChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home/cartChartUser`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let ser1 = [],
        ser2 = [],
        finalDate = [],
        finalValue1 = 0,
        finalValue2 = 0;
      await Promise.all(
        data.data.map((item) => {
          ser1 = [...ser1, item.userBought];
          finalValue1 += item.userBought;
          ser2 = [...ser2, item.userNotBought];
          finalValue2 += item.userNotBought;
          finalDate = [...finalDate, item.date];
        })
      );
      setHomeUserCartChart({
        ...homeUserCartChart,
        loading: false,
        value: finalValue1 + "/" + finalValue2,
        series: [
          {
            name: "عدد المستخدمين الذين فتحوا كروت",
            data: ser1,
          },
          {
            name: "عدد المستخدمين الذين لم يفتحوا كروت",
            data: ser2,
          },
        ],
        options: {
          ...homeUserCartChart.options,
          xaxis: {
            // type: "datetime",
            categories: finalDate,
          },
        },
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getUserCartChart({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeUserCartChart, homeUserCartChart);
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
