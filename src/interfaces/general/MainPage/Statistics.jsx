// import CountUp from "react-countup";

function Statistics() {
  return (
    <>
      <div className="counter-home-section">
        <div className="counter-home-box">
          <div className="counter-home-box-img">
            <img src="images/icon/click.png" />
          </div>
          <h3 className="counter">{/* <CountUp end={613074} /> */}</h3>
          <p>متجر مشترك معنا</p>
        </div>

        <div className="counter-home-box">
          <div className="counter-home-box-img">
            <img src="images/icon/link.png" />
          </div>
          <h3 className="counter">{/* <CountUp end={24117} /> */}</h3>
          <p>عدد المستخدمين النشطين</p>
        </div>

        <div className="counter-home-box">
          <div className="counter-home-box-img">
            <img src="images/icon/members.png" />
          </div>
          <h3 className="counter">{/* <CountUp end={5605} /> */}</h3>
          <p>عملية شـراء</p>
        </div>

        <div className="counter-home-box">
          <div className="counter-home-box-img">
            {" "}
            <img src="images/icon/dollar.png" />
          </div>
          <h3 className="counter" data-number="1,981">
            1,981{" "}
          </h3>
          <p>عرض حصري و قوي</p>
        </div>
      </div>
    </>
  );
}

export default Statistics;
