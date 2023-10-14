import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function deleteStoreBlockFunc(id, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, blocks, setBlocks, store, setStore) {
  try {
    console.log(store);
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/stores/delete-block?storeId=${store.storeInfo.id}&ids[]=${id}`, { ...requestOptions, method: "put", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();

    if (data.success) {
      if (!blocks.rows[id]?.unblock_date) {
        setStore({ ...store, block: false });
      }
      const newCheck = blocks.rows[id]?.unblock_date ? blocks.blocked : false;
      let newRows = [];
      await Promise.all(
        blocks.rows.map((item) => {
          if (item.id != id) return item;
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
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await deleteStoreBlockFunc(id, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, blocks, setBlocks, store, setStore);
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
