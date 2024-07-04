import requestOptions from "../constants/requestOptions";

async function getGeneralPacks(setPacks, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/dev/all-packs`, {
      ...requestOptions,
      method: "get",
    });
    let data = await response.json();
    if (data.success) {
      let final = {};
      await Promise.all(
        data.data.map((cat) => {
          final = { ...final, [cat.id]: { ...cat } };
        })
      );
      setPacks({ ...final });
    } else {
      console.log(data.message);
      toast.error(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export default getGeneralPacks;
