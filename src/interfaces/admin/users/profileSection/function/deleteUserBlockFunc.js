import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

async function deleteUserBlockFunc2(blocks, userBlocks, setUserBlocks, id, currentShowBlocks, userInformation, setUserInformation, refreshStatus, setRefreshStatus, setDuringAdd, toast) {
  try {
    const userId = currentShowBlocks.id;
    const infoRequestOptions = {
      ...requestOptions,
      method: "delete",
      headers: { ...requestOptions.headers, authorization: userInformation.token },
    };
    setDuringAdd(true);

    const response = await fetch(`${import.meta.env.VITE_URL}/admin/users/delete-block?userId=${userId}&ids[]=${+id}`, infoRequestOptions);
    const data = await response.json();

    // const data = { success: true };
    if (data.success) {
      const newCheck = userBlocks.rows[id]?.unblock_date ? userBlocks.blocked : false;
      delete userBlocks.rows[id];
      setUserBlocks({
        ...userBlocks,
        blocked: newCheck,
        count: userBlocks.count - 1,
        rows: {
          ...userBlocks.rows,
        },
      });

      toast.success("تم حذف حظر المستخدم بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await deleteUserBlockFunc2(blocks, userBlocks, setUserBlocks, id, currentShowBlocks, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setDuringAdd, toast);
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

export default deleteUserBlockFunc2;
