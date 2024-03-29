import CountUp, { useCountUp } from "react-countup";

function TopSection() {
  return (
    <>
      <div className="first-section-home">
        <div className="first-section-home-left">
          <img src="images/bg2.png" alt="" />
        </div>
        <div className="first-section-home-right">
          <h3>
            لتوفير أكتـــر و فرحة أكبـــر,
            <br />
            <span style={{ display: "block", width: "max-content" }}>انضم الينا و استمتع بالخصومات</span>
          </h3>
          <p>أضف متجرك وأنضم لمشروعنا و أستفد من الميزات القادمة</p>
        </div>
      </div>
    </>
  );
}

export default TopSection;
