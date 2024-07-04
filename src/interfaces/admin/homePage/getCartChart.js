import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";

export default async function getCartChart(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast,
  setHomeCartChart,
  homeCartChart
) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_URL}/admin/home/cartChart`,
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
      let ser1 = [],
        ser2 = [],
        finalDate = [],
        finalValue1 = 0,
        finalValue2 = 0;
      await Promise.all(
        data.data.map((item) => {
          ser1 = [...ser1, item.cardBought];
          finalValue1 += item.cardBought;
          ser2 = [...ser2, item.cardNotBought];
          finalValue2 += item.cardNotBought;
          finalDate = [...finalDate, item.date];
        })
      );
      setHomeCartChart({
        ...homeCartChart,
        loading: false,
        value: finalValue1 + "/" + finalValue2,
        series: [
          {
            name: "عدد الكروت التي تم شراؤها",
            data: ser1,
          },
          {
            name: "عدد الكروت التي لم يتم شراؤها",
            data: ser2,
          },
        ],
        options: {
          ...homeCartChart.options,
          chart: {
            ...homeCartChart.options.chart,
            events: {
              beforeResetZoom: (ctx, opt) => {
                return {
                  xaxis: {
                    min: Math.max(ser1.length - 10, 1),
                    max: ser1.length,
                  },
                };
              },
              beforeZoom: (ctx, opt) => {
                return {
                  xaxis: {
                    min: opt.xaxis.min < 1 ? 1 : opt.xaxis.min,
                    max:
                      opt.xaxis.max > ser1.length ? ser1.length : opt.xaxis.max,
                  },
                };
              },
            },
          },
          xaxis: {
            // type: "datetime",
            categories: finalDate,
            min: Math.max(ser1.length - 10, 1),
            max: ser1.length,
          },
        },
      });
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getCartChart(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast,
          setHomeCartChart,
          homeCartChart
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
