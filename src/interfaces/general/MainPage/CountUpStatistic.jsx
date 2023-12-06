import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import CountUp from "react-countup";

function CountUpStatistic(props) {
  const countUpRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStart(true);
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    observer.observe(countUpRef.current);
  }, []);

  return (
    <div ref={countUpRef}>
      <CountUp start={start} enableScrollSpy={true} scrollSpyOnce={false} end={props.number} /> {/* Adjust the values as needed */}
    </div>
  );
}

export default CountUpStatistic;
