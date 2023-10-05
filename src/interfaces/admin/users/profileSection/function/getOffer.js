import requestOptions from "../../../../../constants/requestOptions";
import refreshToken from "../../../../../functions/refreshToken";

export default async function getOffer(userInformation, setUserInformation, refreshStatus, setRefreshStatus, id, userId, setStoreInfo, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/admin/users/info-storeOffer?userId=${userId}&id=${id}`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();

    // const data = {
    //   success: true,
    //   data: {
    //     storeId: 1,
    //     name: "2مح333333ل ابو رائد",
    //     avatar: null,
    //     fromHour: 2,
    //     toHour: 8,
    //     locationText: "قرب ساحة الحج عاطف",
    //     longitude: 0.565899,
    //     latitude: -1.565974,
    //     city: "طرطوس",
    //     deletedAt: null,
    //     category: {
    //       name: "بقالية",
    //       emoji: "223rtr12",
    //     },
    //     evaluate: 90,
    //     reasonSpam: "كان محل جميع ورائع للصراحة وكان شغل جميل يعطيكن الف عافية يارب ",
    //     story: [],
    //   },
    // };
    if (data.success) {
      setStoreInfo({ ...data.data });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getOffer({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, id, userId, setStoreInfo, toast);
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
