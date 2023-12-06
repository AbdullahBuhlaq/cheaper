import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SPONSERS, IMAGES } from "../data/sponsers";
import { Fragment } from "react";

function Sponsers() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <div className="sponser-home">
        <div className="sponser-details">
          <h4>الداعمين و الراعين لنا:</h4>
          <p>
            {SPONSERS.map((item, index) => {
              return (
                <Fragment key={index}>
                  {item}
                  <br />
                </Fragment>
              );
            })}
          </p>
        </div>

        <div className="sponser-slider">
          <Slider pauseOnHover {...settings}>
            {IMAGES.map((item, index) => {
              return (
                <div key={index} style={{ width: "50vw", height: "100%" }}>
                  <img src={item} style={{ objectFit: "cover", width: "50vw", height: "300px", borderRadius: "20px", margin: "1vw" }} />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Sponsers;
