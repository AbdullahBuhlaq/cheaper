import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function getUserStatistics(userInformation, setUserInformation, refreshStatus, setRefreshStatus, setUsersBlockedChart, usersBlockedChart, setUsersGenderChart, usersGenderChart, setUsersAgeChart, usersAgeChart, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/users/statisticsInfo`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    if (data.success) {
      setUsersGenderChart({ ...usersGenderChart, series: [data.data.countGender.male, data.data.countGender.female], loading: false });
      setUsersAgeChart({ ...usersAgeChart, series: [data.data.ageWithCount.under18, data.data.ageWithCount.between18And30, data.data.ageWithCount.between31And60, data.data.ageWithCount.more60], loading: false });
      setUsersBlockedChart({
        ...usersBlockedChart,
        countBlockUser: data.data.countBlockUser,
        options: {
          ...usersBlockedChart.options,
          plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270,
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: true,
                    label: "المحظورين",
                    formatter: () => data.data.countBlockUser,
                  },
                },
              },
            },
          },
          tooltip: {
            y: {
              formatter: () => data.data.countBlockUser,
            },
          },
        },
        loading: false,
      });
      // setUsers({ ...users, ...finalUsers });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getUserStatistics({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setUsersBlockedChart, usersBlockedChart, setUsersGenderChart, usersGenderChart, setUsersAgeChart, usersAgeChart, toast);
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
