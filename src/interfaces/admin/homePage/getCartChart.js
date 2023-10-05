import requestOptions from "../../../constants/requestOptions";
import refreshToken from "../../../functions/refreshToken";

export default async function getCartChart(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeCartChart, homeCartChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/home/cartChart`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
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
          xaxis: {
            // type: "datetime",
            categories: finalDate,
          },
        },
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getCartChart({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setHomeCartChart, homeCartChart);
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
