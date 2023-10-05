import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getUserChartFunction(userInformation, setUserInformation, refreshStatus, setRefreshStatus, id, setUserChart, userChart, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/users/chart-user/${id}`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    // const data = {
    //   success: true,
    //   data: [
    //     {
    //       date: "2022-09",
    //       taken: 3,
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
          xaxis: {
            // type: "datetime",
            categories: finalDate,
          },
        },
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getUserChartFunction({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, id, setUserChart, userChart, toast);
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
