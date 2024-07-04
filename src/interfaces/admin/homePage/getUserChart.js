import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";
import { userChartData } from "./data/userChartData";

export default async function getUserChart(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast,
  setHomeUserChart,
  homeUserChart
) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_URL}/admin/home/userChart`,
      {
        ...requestOptions,
        method: "get",
        headers: {
          ...requestOptions.headers,
          authorization: userInformation.token,
        },
      }
    );
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
          chart: {
            ...homeUserChart.options.chart,
            events: {
              beforeResetZoom: (ctx, opt) => {
                return {
                  xaxis: {
                    min: Math.max(chartData.length - 10, 1),
                    max: chartData.length,
                  },
                };
              },
              beforeZoom: (ctx, opt) => {
                return {
                  xaxis: {
                    min: opt.xaxis.min < 1 ? 1 : opt.xaxis.min,
                    max:
                      opt.xaxis.max > chartData.length
                        ? chartData.length
                        : opt.xaxis.max,
                  },
                };
              },
            },
          },
          xaxis: {
            categories: chartDate,
            min: Math.max(chartData.length - 10, 1),
            max: chartData.length,
          },
        },
      }));
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getUserChart(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast,
          setHomeUserChart,
          homeUserChart
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
