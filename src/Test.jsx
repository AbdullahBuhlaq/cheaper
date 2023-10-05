import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./test.css";
import Loading from "./interfaces/general/Loading";
import { useEffect } from "react";
import getLocation from "./interfaces/user/homePage/functions/getLocation";
const Test = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log("got"), (error) => console.log(error);
    });
  });

  return (
    <>
      <div className="map" style={{ width: "200px", height: "200px" }}>
        <div style={{ backgroundColor: "palegoldenrod" }}>
          <Loading />
        </div>
        {console.log("imintest", isLoaded)}
        {isLoaded ? (
          <>
            {console.log("hi")}
            <GoogleMap zoom={10} center={{ lat: 44, lng: -80 }} mapContainerClassName="map-container" />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Test;
