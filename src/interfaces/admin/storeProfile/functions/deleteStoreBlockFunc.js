import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function deleteStoreBlockFunc(
  id,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast,
  blocks,
  setBlocks,
  store,
  setStore
) {
  try {
    console.log(id);
    let response = await fetch(
      `${import.meta.env.VITE_URL}/admin/stores/delete-block?storeId=${
        store.storeInfo.id
      }&ids[]=${id}`,
      {
        ...requestOptions,
        method: "put",
        headers: {
          ...requestOptions.headers,
          authorization: userInformation.token,
        },
      }
    );
    let data = await response.json();

    if (data.success) {
      if (!blocks.rows[id]?.unblock_date) {
        setStore({ ...store, block: false });
      }
      let newCheck = blocks.blocked;
      let newRows = [];
      await Promise.all(
        blocks.rows.map((item) => {
          if (item.id != id) newRows = [...newRows, item];
          else if (!item.unblock_date) newCheck = false;
        })
      );
      setBlocks({
        ...blocks,
        blocked: newCheck,
        rows: [...newRows],
      });
      toast.success("تم حذف الحظر بنجاح", {
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
        await deleteStoreBlockFunc(
          id,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast,
          blocks,
          setBlocks,
          store,
          setStore
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
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}
