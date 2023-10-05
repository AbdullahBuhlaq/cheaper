import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getStorePacks(id, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setInformation, setPacksChart, packsChart) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/stores/packs/${id}`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    // const data = {
    //   success: true,
    //   data: [
    //     {
    //       cost: 0,
    //       createdAt: "2023-09-17T06:55:32.000Z",
    //       "pack.name": "مجانية",
    //       "pack.duration": 40,
    //       count: {
    //         paid: 36,
    //         notPaid: 5,
    //       },
    //     },
    //     {
    //       cost: 0,
    //       createdAt: "2023-09-17T06:55:32.000Z",
    //       "pack.name": "مدفوعة",
    //       "pack.duration": 40,
    //       count: {
    //         paid: 36,
    //         notPaid: 5,
    //       },
    //     },
    //     {
    //       cost: 0,
    //       createdAt: "2023-09-17T06:55:32.000Z",
    //       "pack.name": "مجانية",
    //       "pack.duration": 40,
    //       count: {
    //         paid: 36,
    //         notPaid: 5,
    //       },
    //     },
    //     {
    //       cost: 0,
    //       createdAt: "2023-09-17T06:55:32.000Z",
    //       "pack.name": "مدفوعة",
    //       "pack.duration": 40,
    //       count: {
    //         paid: 36,
    //         notPaid: 5,
    //       },
    //     },
    //   ],
    // };
    if (data.success) {
      let ser1 = [],
        ser2 = [],
        cats = [];
      await Promise.all(
        data.data.map((item) => {
          ser1 = [...ser1, item.count.paid];
          ser2 = [...ser2, item.count.notPaid];
          cats = [...cats, item["pack.name"]];
        })
      );
      setPacksChart({
        ...packsChart,
        loading: false,
        options: {
          ...packsChart.options,
          xaxis: {
            categories: cats,
          },
        },
        series: [
          {
            name: "تم الشراء",
            data: ser1,
          },
          {
            name: "لم يتم الشراء",
            data: ser2,
          },
        ],
      });
      setInformation([...data.data]);
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getStorePacks(id, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setInformation, setPacksChart, packsChart);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    console.log(err);
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}
