import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function sendGift(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast, setCurrentGift, offer, username, offers, setOffers, setEdit) {
  try {
    setCurrentGift(username);
    const infoRequestOptions = {
      ...requestOptions,
      method: "PUT",
      headers: { ...requestOptions.headers, authorization: userInformation.token },
    };

    const response = await fetch(`${import.meta.env.VITE_URL}/user/gift?offerId=${offer.offerUserId}&username=${username}`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setOffers({ ...offers, [offer.offerUserId]: { ...offers[offer.offerUserId], state: "تم الإهداء إلى" + username } });
      setEdit(false);
      toast.success("تم إهداء العرض بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await sendGift({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, toast, setCurrentGift, offer, username, offers, setOffers, setEdit);
      } else {
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    setCurrentGift(-1);
  } catch (err) {
    setCurrentGift(-1);
    console.log(err);
    toast.error("عذرا حدث خطأ ما", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default sendGift;
