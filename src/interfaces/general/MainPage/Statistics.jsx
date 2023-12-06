import STATISTICS from "../data/statistics";
import CountUpStatistic from "./CountUpStatistic";

function Statistics() {
  return (
    <>
      <div className="counter-home-section">
        {STATISTICS.map((item, index) => {
          return (
            <div key={index} className="counter-home-box">
              <div className="counter-home-box-img">
                <img src="images/icon/click.png" />
              </div>
              <h3 className="counter">
                <CountUpStatistic number={item.number} />
                {/* <CountUp enableScrollSpy={true} scrollSpyOnce={false} end={item.number} /> */}
              </h3>
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Statistics;
