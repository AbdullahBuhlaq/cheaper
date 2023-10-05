import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function unblockStore(id, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, blocks, setBlocks, store, setStore) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/stores/unblock/${id}`, { ...requestOptions, method: "put", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();

    if (data.success) {
      let finalData = [];
      await Promise.all(
        blocks.rows.map((item) => {
          if (!item.unblock_date) finalData = [...finalData, { ...item, unblock_date: new Date().toISOString() }];
          else finalData = [...finalData, { ...item }];
        })
      );
      setStore({ ...store, block: false });
      setBlocks({
        ...blocks,
        blocked: false,
        rows: [...finalData],
      });
      toast.success("تم فك الحظر بنجاح", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await unblockStore(id, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, blocks, setBlocks, store, setStore);
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
