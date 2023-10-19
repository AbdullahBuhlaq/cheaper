import { useEffect } from "react";

function WinGift(props) {
  useEffect(() => {
    props.setRun(true);
  }, []);

  try {
    return <>you win a gift</>;
  } catch (err) {
    console.log(err);
  }
}

export default WinGift;
