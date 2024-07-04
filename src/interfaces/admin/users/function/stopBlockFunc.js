import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function stopBlockFunc(
  usersBlockedChart,
  setUsersBlockedChart,
  blocks,
  userBlocks,
  setUserBlocks,
  users,
  setUsers,
  id,
  currentShowBlocks,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  setDuringAdd,
  toast
) {
  try {
    const userId = currentShowBlocks.id;
    const infoRequestOptions = {
      ...requestOptions,
      method: "PUT",
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
    };
    setDuringAdd(true);

    const response = await fetch(
      `${
        import.meta.env.VITE_URL
      }/admin/users/unblock?userId=${userId}&ids[]=${+id}`,
      infoRequestOptions
    );
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      setUsers({
        ...users,
        [currentShowBlocks.id]: {
          ...users[currentShowBlocks.id],
          blocked: false,
        },
      });
      setUserBlocks({
        ...userBlocks,
        blocked: false,
        rows: {
          ...userBlocks.rows,
          [id]: {
            ...userBlocks.rows[id],
            unblock_date: new Date().toISOString(),
          },
        },
      });
      const newNumber = usersBlockedChart.countBlockUser - 1;
      setUsersBlockedChart((usersBlockedChart) => ({
        ...usersBlockedChart,
        countBlockUser: newNumber,
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
                    formatter: () => newNumber,
                  },
                },
              },
            },
          },
          tooltip: {
            y: {
              formatter: () => newNumber,
            },
          },
        },
        loading: false,
      }));

      toast.success("تم إيقاف حظر المستخدم بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
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
        await stopBlockFunc(
          usersBlockedChart,
          setUsersBlockedChart,
          blocks,
          userBlocks,
          setUserBlocks,
          users,
          setUsers,
          id,
          currentShowBlocks,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          setDuringAdd,
          toast
        );
      } else {
        console.log(data.message);
        toast.error(data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    setDuringAdd(false);
  } catch (err) {
    setDuringAdd(false);
    console.log(err);
    toast.error("عذرا حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default stopBlockFunc;
