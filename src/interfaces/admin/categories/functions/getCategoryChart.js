import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function getCategoryChart(
  id,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  setCategoryChart,
  categoryChart,
  toast
) {
  try {
    let response = await fetch(
      `${
        import.meta.env.VITE_URL
      }/admin/category/chartForCategory?categoryId=${id}`,
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
        finalDate = [];
      await Promise.all(
        data.data.map((item) => {
          ser1 = [...ser1, item.taken];
          ser2 = [...ser2, item.notTaken];
          finalDate = [...finalDate, item.date];
        })
      );
      setCategoryChart({
        ...categoryChart,
        series: [
          { name: "تم الشراء", data: ser1 },
          { name: "لم يتم الشراء", data: ser2 },
        ],
        categories: finalDate,
        loading: false,
        options: {
          ...categoryChart.options,
          chart: {
            ...categoryChart.options.chart,
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
            ...categoryChart.options.xaxis,
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
        await getCategoryChart(
          id,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          setCategoryChart,
          categoryChart,
          toast
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

export default getCategoryChart;
