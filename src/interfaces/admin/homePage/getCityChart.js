import requestOptions from "../../../constants/requestOptions";
import selectOptions from "../../../constants/selectOptions";
import refreshToken from "../../../functions/refreshToken";

export default async function getCityChart(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeCityChart, homeCityChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home/cityChart`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      let finalData = [];
      let finalCities = [];
      let citiesObj = {};
      await Promise.all(
        selectOptions.city.map((city) => {
          citiesObj[city.name] = false;
        })
      );
      await Promise.all(
        data.data.map((item) => {
          finalData = [...finalData, item.count];
          finalCities = [...finalCities, item.city];
          citiesObj[item.city] = true;
        })
      );
      await Promise.all(
        selectOptions.city.map((city) => {
          if (!citiesObj[city.name]) {
            finalData = [...finalData, 0];
            finalCities = [...finalCities, city.name];
          }
        })
      );
      setHomeCityChart({
        ...homeCityChart,
        loading: false,
        options: {
          ...homeCityChart.options,
          series: [
            {
              name: "محل",
              data: finalData,
            },
          ],
          xaxis: {
            labels: {
              rotate: -45,
            },
            categories: finalCities,
            tickPlacement: "on",
          },
        },
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getCityChart({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeCityChart, homeCityChart);
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
