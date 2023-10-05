import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";
import { userChartData } from "./data/userChartData";

export default async function getUserChart(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeUserChart, homeUserChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home/userChart`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let chartData = [];
      let chartDate = [];
      await Promise.all(
        data.data.map((chartItem, index) => {
          chartData = [...chartData, chartItem.count];
          chartDate = [...chartDate, chartItem.date];
        })
      );
      setHomeUserChart((homeUserChart) => ({
        ...homeUserChart,
        loading: false,
        series: [{ name: homeUserChart.series[0].name, data: chartData }],
        options: {
          ...homeUserChart.options,
          xaxis: {
            categories: chartDate,
          },
        },
      }));
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getUserChart({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeUserChart, homeUserChart);
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
