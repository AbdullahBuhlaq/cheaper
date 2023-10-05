import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AutoSlidingImages = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    try {
      const intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % props.images.length);
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    } catch (err) {
      console.log(err);
    }
  }, [props.images.length]);

  try {
    return (
      <div style={{ position: "relative", overflow: "hidden", height: "300px" }}>
        <AnimatePresence initial={false}>
          <motion.img key={currentSlide} src={props.images[currentSlide]} alt={`Slide ${currentSlide + 1}`} style={{ position: "absolute", width: "100%", height: "100%", left: "0" }} initial={{ x: "100%" }} animate={{ x: "0" }} exit={{ x: "-100%" }} transition={{ duration: 0.5 }} />
        </AnimatePresence>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default AutoSlidingImages;
