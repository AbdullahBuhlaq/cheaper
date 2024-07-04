import requestOptions from "../../../../constants/requestOptions";
import refreshToken from "../../../../functions/refreshToken";

async function sendSpam(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  setDuringAdd,
  toast,
  spam,
  setOffers,
  offers,
  currentOffer
) {
  try {
    const infoRequestOptions = {
      ...requestOptions,
      method: "PUT",
      headers: {
        ...requestOptions.headers,
        authorization: userInformation.token,
      },
      body: JSON.stringify({
        reasonSpam: spam,
      }),
    };
    setDuringAdd(true);

    const response = await fetch(
      `${import.meta.env.VITE_URL}/user/spam-evaluate?type=spam&offerUserId=${
        currentOffer.offerUserId
      }`,
      infoRequestOptions
    );
    const data = await response.json();
    if (data.success) {
      setOffers({
        ...offers,
        [currentOffer.offerUserId]: {
          ...offers[currentOffer.offerUserId],
          spam: spam,
        },
      });
      toast.success("تم إرسال الإبلاغ بنجاح.", {
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
        await sendSpam(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          setDuringAdd,
          toast,
          spam,
          setOffers,
          offers,
          currentOffer
        );
      } else {
        console.log(data.message);
        toast.error(data.message, {
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

export default sendSpam;
