import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function blockStore(id, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, blocks, setBlocks, store, setStore) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/stores/block/${id}`, { ...requestOptions, method: "put", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();

    if (data.success) {
      setStore({ ...store, block: true });
      setBlocks({
        ...blocks,
        count: blocks.count + 1,
        blocked: true,
        rows: [
          ...blocks.rows,
          {
            block_date: new Date().toISOString(),
            unblock_date: null,
            "block.reason": "لقد تجاوز المحل الخاص بك على الحد الادنة من الابلاغات",
            "block.duration": 15,
            "block.restrictions": { show: ["store"], action: ["store.disableShowInCart"] },
          },
        ],
      });
      toast.success("تم الحظر بنجاح", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await blockStore(id, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, blocks, setBlocks, store, setStore);
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
