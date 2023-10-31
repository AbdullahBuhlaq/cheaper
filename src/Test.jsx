import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiM2JkdWxsYWgtYnU3bGE4IiwiYSI6ImNsa2lqcHU2ZTBibnQzZW1nMnAwMXNjajIifQ.vnDf9FPi6lquHvpl520TLg";

const apiKey = "5b3ce3597851110001cf62481ae5c95c615c41f5a7618abb76ccd41b";

// function Test() {
//   const [map, setMap] = useState(null);
//   const [start, setStart] = useState([36.7238, 34.7284]);
//   const [end, setEnd] = useState([36.7578, 35.1318]);
//   const [route, setRoute] = useState(null);

//   useEffect(() => {
//     const newMap = new mapboxgl.Map({
//       profile: "walking",
//       container: "map",
//       style: "mapbox://styles/mapbox/dark-v10",
//       center: [36.7238, 34.7284],
//       zoom: 12,
//     });

//     setMap(newMap);
//   }, []);

//   const handleStartInputChange = (event) => {
//     setStart(event.target.value);
//   };

//   const handleEndInputChange = (event) => {
//     setEnd(event.target.value);
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}&end=${end}`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         const coordinates = data.features[0].geometry.coordinates;
//         const routeLine = {
//           type: "Feature",
//           geometry: {
//             type: "LineString",
//             coordinates: coordinates,
//           },
//         };

//         if (map.getSource("route")) {
//           map.getSource("route").setData(routeLine);
//         } else {
//           map.addSource("route", {
//             type: "geojson",
//             data: routeLine,
//           });

//           map.addLayer({
//             id: "route",
//             type: "line",
//             source: "route",
//             layout: {
//               "line-join": "round",
//               "line-cap": "round",
//             },
//             paint: {
//               "line-color": "#888",
//               "line-width": 8,
//             },
//           });
//         }
//         console.log(data);
//         setRoute(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <h1>Directions</h1>
//       <form onSubmit={handleFormSubmit}>
//         <label htmlFor="start">Start:</label>
//         <input type="text" id="start" onChange={handleStartInputChange} />

//         <label htmlFor="end">End:</label>
//         <input type="text" id="end" onChange={handleEndInputChange} />

//         <button type="submit">Get Directions</button>
//       </form>

//       <div id="map" style={{ width: "100%", height: "400px" }} />

//       {route && (
//         <div>
//           <p>Distance: {route.features[0].properties.segments[0].distance.toFixed(2)} meters</p>
//           <p>Duration: {route.features[0].properties.segments[0].duration.toFixed(2)} seconds</p>
//         </div>
//       )}
//     </div>
//   );
// }

function Test() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [coord, setCoord] = useState({ lat: 34.72682, long: 36.72339 });
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="lat"
          value={lat}
          onChange={(e) => {
            setLat(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="long"
          value={long}
          onChange={(e) => {
            setLong(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setCoord({ ...coord, lat: lat, long: long });
          }}
        >
          mark
        </button>
      </div>
      <div class="gmap_canvas">
        <iframe width="600" height="500" id="gmap_canvas" src={`https://maps.google.com/maps?q=${lat},${long}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" onClick={(e) => console.log(e)}></iframe>
      </div>
    </>
  );
}

export default Test;
