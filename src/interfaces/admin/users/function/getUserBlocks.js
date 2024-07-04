import requestOptions from "../../../../constants/requestOptions";
import jsonParse from "../../../../functions/jsonParse";
import refreshToken from "../../../../functions/refreshToken";

export default async function getUserBlocks(
  userInformation,
  setUserInformation,
  refreshStatus,
  setRefreshStatus,
  id,
  setBlocks,
  blocks,
  toast
) {
  try {
    let response = await fetch(
      `${import.meta.env.VITE_URL}/admin/users/allBlockUser/${id}`,
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
      let finalRows = {};
      await Promise.all(
        data.data.rows.map(async (block) => {
          finalRows[block.id] = {
            ...block,
            "block.restrictions": await jsonParse(block["block.restrictions"]),
          };
        })
      );
      setBlocks({ ...data.data, rows: { ...finalRows } });
    } else {
      if (data.message == "jwt expired") {
        const status = await refreshToken(
          userInformation,
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          toast
        );
        await getUserBlocks(
          { ...userInformation, ...status },
          setUserInformation,
          refreshStatus,
          setRefreshStatus,
          id,
          setBlocks,
          blocks,
          toast
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
  }
}
