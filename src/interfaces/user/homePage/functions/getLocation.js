function getLocation(setLocation) {
  try {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          console.log(location);
          if (location.coords.accuracy > 1000) {
            setLocation({ status: "success", location: { coords: { latitude: 34.732427, longitude: 36.713696 } } });
            // setLocation({ status: "error", message: "لم نتمكن من العثور على موقعك بدقة, يرجى المحاولة مرة اخرى" });
          } else {
            setLocation({ status: "success", location: location });
          }
        },
        (err) => {
          setLocation({ status: "error", message: err.message });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      );
    } else {
      setLocation({ status: "error", message: "خاصية الموقع غير متاحة في متصفحك, يرجى استخدام متصفح آخر." });
    }
  } catch (err) {
    setLocation({ status: "error", message: err });
  }
}

export default getLocation;
