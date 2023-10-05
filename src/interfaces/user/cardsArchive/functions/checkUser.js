import requestOptions from "../../../../constants/requestOptions";

async function checkUser(setDuringAdd, toast, userName, setUsers, setLastSearch) {
  try {
    const name = userName;
    const infoRequestOptions = {
      ...requestOptions,
      method: "get",
    };
    setDuringAdd(true);

    const response = await fetch(`${import.meta.env.VITE_URL}/dev/check-username?username=${name}`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      setUsers([...data.data]);
      setLastSearch(name);
    } else {
      console.log(data.error);
      toast.error(data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
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

export default checkUser;
