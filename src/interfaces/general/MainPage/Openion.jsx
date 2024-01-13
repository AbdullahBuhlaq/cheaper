import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OPENIONS from "../data/openion";
import { useState } from "react";
import useWindowDimensions from "../../../functions/useWindowDimensions";

function Openion() {
  const { height, width } = useWindowDimensions();
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
  });

  try {
    return (
      <>
        <div className="openion-section" style={{ position: "relative", height: "max-contant", overflow: "hidden" }}>
          <Slider pauseOnHover {...settings} slidesToShow={width >= 768 ? 2 : 1}>
            {OPENIONS.map((item, index) => {
              return (
                <div key={index}>
                  <div className="openion-section-box" style={{ margin: "0 0.6vw", width: width >= 768 ? "30vw" : "60vw" }}>
                    <div className="openion-section-box-header">
                      <div className="openion-section-box-header-name">
                        <a href="#">
                          <h5>{item.name}</h5>
                          <span>{item.city}</span>
                        </a>
                      </div>
                      <img className="customer-profile-pic" src={`images/img/${item.image}`} alt="" />
                    </div>
                    <div className="openion-section-box-body">
                      <p>{item.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Openion;
