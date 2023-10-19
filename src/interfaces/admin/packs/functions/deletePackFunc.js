import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function deletePackFunc(id, userInformation, setUserInformation, refreshStatus, setRefreshStatus, packs, setPacks, packsChart, setPacksChart, toast) {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin/packs/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: userInformation.token }, method: "delete" });
    const data = await response.json();
    if (data.success) {
      let finalPacks = [];
      await Promise.all(
        packsChart.series.map((item, index) => {
          if (item.name != packs[id].name) finalPacks = [...finalPacks, item];
        })
      );
      delete packs[id];
      setPacks({ ...packs });
      setPacksChart({
        ...packsChart,
        loading: false,
        series: finalPacks,
      });
      toast.success("تم حذف الباقة", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await deletePackFunc(id, { ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, packs, setPacks, packsChart, setPacksChart, toast);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    toast.error("عذرا, حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
    console.log(err);
  }
}

export default deletePackFunc;
