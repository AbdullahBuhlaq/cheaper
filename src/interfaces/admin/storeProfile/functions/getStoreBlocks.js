import requestOptions from "../../../../constants/requestOptions";
import jsonParse from "../../../../functions/jsonParse";
import refreshToken from "../../../../functions/refreshToken";

export default async function getStoreBlocks(
  id,
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  toast,
  setInformation
) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_URL}/admin/stores/all-block/${id}`,
      {
        ...requestOptions,
        method: "get",
        headers: {
          ...requestOptions.headers,
          authorization: userInformation.token,
        },
      }
    );
    let data = await response.json();
    if (data.success) {
      let finalActive = [];
      let finalNotActive = [];
      await Promise.all(
        data.data.rows.map((item) => {
          finalActive = [
            ...finalActive,
            {
              ...item,
              "block.restrictions": jsonParse(item["block.restrictions"]),
            },
          ];
        })
      );

      setInformation({ ...data.data, rows: [...finalActive] });
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getStoreBlocks(
          id,
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast,
          setInformation
        );
      } else {
        console.log(data.message);
        toast.error(data.message, {
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
