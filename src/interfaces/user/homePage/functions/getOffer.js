import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function getOffer(setOffer, setStatus, setOpen, city, location, homeInfo, setHomeInfo, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/user/open-box?longitude=${location.location.coords.longitude}&latitude=${location.location.coords.latitude}&city=${city.city}&type=free`, { ...requestOptions, method: "get", headers: { ...requestOptions.headers, authorization: userInformation.token } });
    let data = await response.json();
    // let data = {
    //   success: true,
    //   data: {
    //     nameStore: "shop3",
    //     avatarStore: null,
    //     storeId: 7,
    //     fromHour: "11:59",
    //     toHour: "11:59",
    //     longitude: 36.713696,
    //     latitude: 34.732426,
    //     discount: 15,
    //     phoneNumber: "0923400222",
    //     packStoreId: 8,
    //     category: {
    //       name: "صيدلية",
    //       emoji: "31rt23r12",
    //     },
    //     story: [],
    //     QR: "BTLLpvxxJefLEiwKzQlvtV4goL30/lp0dppgTs2vsaLs2Xi1Rxgq/EKM4uPy9+tk3gjv4wD0hk3gOO5iBTD4YvW5P1uIZLvmku/XMpkL+y1+km5OFHK9/IDZ+uzev853EDPjKU5UOgPVoLzS5f2rkQ==",
    //     offerUserId: 1,
    //   },
    // };
    console.log(data);
    if (data.success) {
      setOffer({ ...data.data });
      setHomeInfo({ ...homeInfo, freeBoxToday: homeInfo.freeBoxToday - 1, free: { ...homeInfo.free, notTaken: homeInfo.free.notTaken + 1 } });
      setStatus("done");
      toast.success("مبروك!!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await getOffer(setOffer, setStatus, setOpen, city, location, homeInfo, setHomeInfo, userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
      } else {
        setOpen(false);
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  } catch (err) {
    setOpen(false);
    console.log(err);
    toast.error("عذرا, حصل خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default getOffer;
