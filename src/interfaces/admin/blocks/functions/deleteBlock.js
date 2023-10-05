import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

export default async function deleteBlock(id, userInformation, setUserInformation, refreshStatus, setRefreshStatus, blocks, setBlocks, setCurrentEdit, toast) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/block/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: userInformation.token }, method: "delete" });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete blocks[id];
      setBlocks({ ...blocks });
      setCurrentEdit(blocks[Object.keys(blocks)[0]]);
      toast.success("تم حذف الحظر", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await deleteBlock(id, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, blocks, setBlocks, setCurrentEdit, toast);
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
