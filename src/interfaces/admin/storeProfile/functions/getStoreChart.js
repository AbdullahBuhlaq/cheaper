import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getStoreProfileChart(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  id,
  setUserChart,
  userChart,
  toast
) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_URL}/admin/stores/chart/${id}`,
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
    // const data = {
    //   success: true,
    //   data: [
    //     {
    //       date: "2022-09",
    //       taken: 35,
    //       notTaken: 0,
    //     },
    //     {
    //       date: "2023-09",
    //       taken: 1,
    //       notTaken: 0,
    //     },
    //   ],
    // };
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
      setUserChart({
        ...userChart,
        loading: false,
        series: [
          {
            name: "عدد العروض التي تم شراؤها",
            data: ser1,
          },
          {
            name: "عدد العروض التي لم يتم شراؤها",
            data: ser2,
          },
        ],
        options: {
          ...userChart.options,
          chart: {
            ...userChart.options.chart,
            events: {
              beforeResetZoom: (ctx, opt) => {
                return {
                  xaxis: {
                    min: Math.max(finalDate.length - 10, 1),
                    max: finalDate.length,
                  },
                };
              },
              beforeZoom: (ctx, opt) => {
                return {
                  xaxis: {
                    min: opt.xaxis.min < 1 ? 1 : opt.xaxis.min,
                    max:
                      opt.xaxis.max > finalDate.length
                        ? finalDate.length
                        : opt.xaxis.max,
                  },
                };
              },
            },
          },
          xaxis: {
            // type: "datetime",
            categories: finalDate,
            min: Math.max(finalDate.length - 10, 1),
            max: finalDate.length,
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
        await getStoreProfileChart(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          id,
          setUserChart,
          userChart,
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
