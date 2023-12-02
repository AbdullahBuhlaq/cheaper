import DeviceCard from "../DeviceCard";
import "../css/devices.css";
import { FaCircleXmark } from "react-icons/fa6";

function DevicesCards(props) {
  try {
    return (
      <>
        <div className="advices" style={{ height: "94%", overflow: "auto" }}>
          <div
            className={"btn-close-right"}
            onClick={() => {
              document.getElementsByClassName("new-right-area")[0].classList.remove("show");
            }}
          >
            <FaCircleXmark />
          </div>
          <div className="advice-header">
            <p>سجل تسجيل الدخول</p>
          </div>

          {props.profile.devices.map((device, index) => {
            return <DeviceCard key={index} device={device} index={index} logoutDevice={props.logoutDevice} />;
          })}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default DevicesCards;
