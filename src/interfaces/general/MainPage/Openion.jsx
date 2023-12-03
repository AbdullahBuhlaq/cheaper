import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Openion() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const showData = [
    { name: "رأفت السيد", city: "حمص", image: "customer-1.png", comment: "'' اعطي تقييمي لمطعم غرانو كونه يقدم أفضل الوجبات و بطعم جديد عن العادة و بمواصفات عالمية." },
    { name: "رأفت السيد", city: "حمص", image: "customer-1.png", comment: "'' اعطي تقييمي لمطعم غرانو كونه يقدم أفضل الوجبات و بطعم جديد عن العادة و بمواصفات عالمية." },
    { name: "رأفت السيد", city: "حمص", image: "customer-1.png", comment: "'' اعطي تقييمي لمطعم غرانو كونه يقدم أفضل الوجبات و بطعم جديد عن العادة و بمواصفات عالمية." },
    { name: "رأفت السيد", city: "حمص", image: "customer-1.png", comment: "'' اعطي تقييمي لمطعم غرانو كونه يقدم أفضل الوجبات و بطعم جديد عن العادة و بمواصفات عالمية." },
  ];

  try {
    return (
      <>
        <div className="openion-section" style={{ position: "relative", height: "max-contant", overflow: "hidden" }}>
          <Slider pauseOnHover {...settings}>
            {showData.map((item, index) => {
              return (
                <div key={index} className="openion-section-box">
                  <div className="openion-section-box-header">
                    <div className="openion-section-box-header-name">
                      <a href="#">
                        <h5>{showData[index].name}</h5>
                        <span>{showData[index].city}</span>
                      </a>
                    </div>
                    <img className="customer-profile-pic" src={`images/img/${showData[index].image}`} alt="" />
                  </div>
                  <div className="openion-section-box-body">
                    <p>{showData[index].comment}</p>
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
