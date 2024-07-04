import requestOptions from "../constants/requestOptions";

async function getGeneralCategories(setCategories, toast) {
  try {
    let response = await fetch(`${import.meta.env.VITE_URL}/dev/all-category`, {
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
      setCategories({ ...final });
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

export default getGeneralCategories;
