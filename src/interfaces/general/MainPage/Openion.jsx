import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
function Openion() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const showData = [
    { name: "رأفت السيد", city: "حمص", comment: "'' اعطي تقييمي لمطعم غرانو كونه يقدم أفضل الوجبات و بطعم جديد عن العادة و بمواصفات عالمية." },
    { name: "رأفت السيد", city: "حمص", comment: "'' اعطي تقييمي لمطعم غرانو كونه يقدم أفضل الوجبات و بطعم جديد عن العادة و بمواصفات عالمية." },
    { name: "رأفت السيد", city: "حمص", comment: "'' اعطي تقييمي لمطعم غرانو كونه يقدم أفضل الوجبات و بطعم جديد عن العادة و بمواصفات عالمية." },
    { name: "رأفت السيد", city: "حمص", comment: "'' اعطي تقييمي لمطعم غرانو كونه يقدم أفضل الوجبات و بطعم جديد عن العادة و بمواصفات عالمية." },
  ];

  useEffect(() => {
    try {
      const intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % showData.length);
      }, 6000);

      return () => {
        clearInterval(intervalId);
      };
    } catch (err) {
      console.log(err);
    }
  }, []);
  try {
    return (
      <>
        <div className="openion-section" style={{ position: "relative", height: "max-contant", overflow: "hidden" }}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div className="openion-section-box" key={currentSlide} style={{ height: "100%" }} initial={{ x: "150%" }} animate={{ x: "0" }} exit={{ x: "-150%" }} transition={{ duration: 1 }}>
              <div className="openion-section-box-header">
                <img className="customer-profile-pic" src="images/img/customer-1.png" alt="" />
                <div className="openion-section-box-header-name">
                  <a href="#">
                    <h5>{showData[currentSlide].name}</h5>
                    <span>{showData[currentSlide].city}</span>
                  </a>
                </div>
              </div>
              <div className="openion-section-box-body">
                <p>{showData[currentSlide].comment}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <span
            onClick={() => {
              setCurrentSlide((prevSlide) => (prevSlide + showData.length - 1) % showData.length);
              const intervalId = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % showData.length);
              }, 6000);

              return () => {
                clearInterval(intervalId);
              };
            }}
          >
            lsdk
          </span>
          <span onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % showData.length)}>lsdkfj</span>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Openion;
