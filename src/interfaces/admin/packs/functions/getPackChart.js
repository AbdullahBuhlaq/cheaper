import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function getPackChart(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setPacksChart, packsChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/packs/chartPack`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();

    if (data.success) {
      let packData = [];
      let dates = {};
      await Promise.all(
        data.data.map(async (item) => {
          await Promise.all(
            item.countWithDate.map((dItem) => {
              dates[dItem.date] = true;
            })
          );
        })
      );
      let datesArr = Object.keys(dates).sort();
      await Promise.all(
        data.data.map(async (item, index) => {
          let finalData = [],
            iterator = 0;
          await Promise.all(
            datesArr.map((date) => {
              if (iterator >= item.countWithDate.length) {
                finalData = [...finalData, null];
              } else if (date == item.countWithDate[iterator].date) {
                finalData = [...finalData, item.countWithDate[iterator].count];
                iterator++;
              } else {
                finalData = [...finalData, null];
              }
            })
          );

          packData = [...packData, { name: item.name, data: finalData }];
        })
      );
      setPacksChart({
        ...packsChart,
        loading: false,
        series: packData,
        options: {
          ...packsChart.options,
          chart: {
            ...packsChart.options.chart,
            events: {
              beforeResetZoom: (ctx, opt) => {
                return {
                  xaxis: {
                    min: Math.max(datesArr.length - 10, 1),
                    max: datesArr.length,
                  },
                };
              },
              beforeZoom: (ctx, opt) => {
                return {
                  xaxis: {
                    min: opt.xaxis.min < 1 ? 1 : opt.xaxis.min,
                    max: opt.xaxis.max > datesArr.length ? datesArr.length : opt.xaxis.max,
                  },
                };
              },
            },
          },
          xaxis: {
            // type: "datetime",
            categories: datesArr,
            min: Math.max(datesArr.length - 10, 1),
            max: datesArr.length,
          },
        },
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getPackChart({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setPacksChart, packsChart);
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

export default getPackChart;
