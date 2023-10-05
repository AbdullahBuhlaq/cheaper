import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";

export default async function getStoreChart(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeStoreChart, homeStoreChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home/storeChart`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let chartDataPaid = [];
      let chartDataFree = [];
      let chartDate = [];
      await Promise.all(
        data.data.map((chartItem, index) => {
          chartDataPaid = [...chartDataPaid, chartItem.paidCount];
          chartDataFree = [...chartDataFree, chartItem.freeCount];
          chartDate = [...chartDate, chartItem.date];
        })
      );
      setHomeStoreChart((homeStoreChart) => ({
        ...homeStoreChart,
        loading: false,
        series: [
          { name: homeStoreChart.series[0].name, data: chartDataFree },
          { name: homeStoreChart.series[1].name, data: chartDataPaid },
        ],
        options: {
          ...homeStoreChart.options,
          xaxis: {
            categories: chartDate,
          },
        },
      }));
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getStoreChart({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeStoreChart, homeStoreChart);
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
