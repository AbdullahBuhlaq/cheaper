import { useEffect } from "react";

function WinGift(props) {
  useEffect(() => {
    props.setRun(true);
  }, []);

  try {
    return (
      <>
        <div style={{ width: "80vw", height: "70svh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "0 auto" }}>
          <img src="images/gift.png" style={{ width: "100%", objectFit: "contain" }} />
          مبروك! لقد ربحت عرضا إضافيا مجانيا
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default WinGift;
