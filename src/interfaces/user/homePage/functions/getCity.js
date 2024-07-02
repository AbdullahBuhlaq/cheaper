import { reverseCities } from "../../../../constants/reverseCities";

async function getCity(setCity, location) {
  try {
    const cityurl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${
      location.location.coords.latitude
    }&lon=${location.location.coords.longitude}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`;
    const response = await fetch(cityurl);
    const data = await response.json();
    console.log({ data });
    setCity({
      status: "success",
      city: data[0].state ? reverseCities[data[0].state] : "طرطوس",
    });
  } catch (err) {
    console.log(err);
    setCity({ status: "error", message: err });
  }
}

export default getCity;
