import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function sendEva(userInformation, setUserInformation, refreshStatus, setRefreshStatus, setDuringAdd, toast, eva, setOffers, offers, currentOffer) {
  try {
    const infoRequestOptions = {
      ...requestOptions,
      method: "PUT",
      headers: { ...requestOptions.headers, authorization: userInformation.token },
      body: JSON.stringify({
        evaluate: eva,
      }),
    };
    setDuringAdd(true);

    const response = await fetch(`${import.meta.env.VITE_URL}/user/spam-evaluate?type=evaluate&offerUserId=${currentOffer.offerUserId}`, infoRequestOptions);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setOffers({ ...offers, [currentOffer.offerUserId]: { ...offers[currentOffer.offerUserId], evaluate: eva } });
      toast.success("تم إرسال التقييم بنجاح.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (data.error == "jwt expired") {
        const status = await refreshToken(userInformation, setUserInformation, refreshStatus, setRefreshStatus, toast);
        await sendEva({ ...userInformation, ...status }, setUserInformation, refreshStatus, setRefreshStatus, setDuringAdd, toast, eva, setOffers, offers, currentOffer);
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

export default sendEva;
