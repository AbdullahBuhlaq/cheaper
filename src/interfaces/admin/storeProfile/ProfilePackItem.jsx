import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function ProfilePackItem(props) {
  try {
    return (
      <>
        <div class="received-item-line">
          <div class="progress-line" style={{ marginRight: "5px" }}>
            <span class="time start">{new Date(props.item.createdAt).toLocaleDateString()}</span>
            <span class="time end">{new Date(new Date(props.item.createdAt).setDate(new Date(props.item.createdAt).getDate() + props.item["pack.duration"])).toLocaleDateString()}</span>
          </div>
          <div class="received-items-content">
            <div class="perfect-card-container" dir="ltr">
              <div class="perfect-card">
                <div class="perfect-card-right" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly" }}>
                  نسبة الحسم
                  <CircularProgressbar
                    value={[props.item.discount]}
                    text={`${[props.item.discount]}%`}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)

                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: "butt",

                      // Text size
                      textSize: "20px",

                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 0.5,

                      pathColor: `rgba(62, 152, 199, ${props.item.discount / 100})`,
                      textColor: "#f88",
                      trailColor: "#d6d6d6",
                      backgroundColor: "#3e98c7",
                    })}
                  />
                </div>
                <div class="perfect-card-left">
                  <div class="perfect-card-left-header">
                    <h1>اسم الباقة : {props.item["pack.name"]}</h1>
                    <h2>سعر الباقة : {props.item.cost}</h2>
                  </div>
                  <div class="perfect-card-left-body">
                    <h1>تم الشراء : {props.item.count.paid}</h1>
                    <h2>لم يتم الشراء : {props.item.count.notPaid}</h2>
                    <h3> المدة : {props.item["pack.duration"]} </h3>
                  </div>
                </div>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfilePackItem;
