import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function addNewBlock(usersBlockedChart, setUsersBlockedChart, blocks, userBlocks, setUserBlocks, users, setUsers, newBlock, currentShowBlocks, userInformation, setUserInformation, refreshStatus, setRefreshStatus, setDuringAdd, toast) {
  try {
    const newData = newBlock;
    const userId = currentShowBlocks.id;
    const infoRequestOptions = {
      ...requestOptions,
      method: "PUT",
      headers: { ...requestOptions.headers, authorization: userInformation.token },
    };
    setDuringAdd(true);

    const response = await fetch(`${import.meta.env.VITE_URL}/admin/users/block?userId=${userId}&blockId=${+newData.blockId}`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setUsers({ ...users, [currentShowBlocks.id]: { ...users[currentShowBlocks.id], blocked: true } });
      setUserBlocks({
        ...userBlocks,
        blocked: true,
        count: userBlocks.count + 1,
        rows: {
          ...userBlocks.rows,
          [data.data]: {
            "block.duration": blocks[newData.blockId].duration,
            "block.reason": blocks[newData.blockId].reason,
            "block.restrictions": blocks[newData.blockId].restrictions,
            block_date: new Date().toISOString(),
            unblock_date: null,
            id: data.data,
          },
        },
      });
      const newNumber = usersBlockedChart.countBlockUser + 1;
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

      toast.success("تم حظر المستخدم بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await addNewBlock(usersBlockedChart, setUsersBlockedChart, blocks, userBlocks, setUserBlocks, users, setUsers, newBlock, currentShowBlocks, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setDuringAdd, toast);
      } else {
        console.log(data.error);
        toast.error(data.error, {
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

export default addNewBlock;
