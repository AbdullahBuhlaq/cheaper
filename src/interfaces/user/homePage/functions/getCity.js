import { reverseCities } from "../../../../constants/reverseCities";

async function getCity(setCity, location) {
  try {
    const cityurl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.location.coords.latitude}&lon=${location.location.coords.longitude}&appid=94014be88226aec7a02dbc4b61bc3485`;
    const response = await fetch(cityurl);
    const data = await response.json();
    setCity({ status: "success", city: data[0].state ? reverseCities[data[0].state] : "طرطوس" });
  } catch (err) {
    console.log(err);
    setCity({ status: "error", message: err });
  }
}

export default getCity;
