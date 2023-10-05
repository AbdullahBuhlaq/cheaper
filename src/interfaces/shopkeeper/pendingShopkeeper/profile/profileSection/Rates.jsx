import DeviceCard from "../DeviceCard";
import "../css/devices.css";

function DevicesCards(props) {
  try {
    return (
      <>
        <div class="advices" style={{ height: "96%", overflow: "auto" }}>
          <div class="advice-header">
            <p>سجل تسجيل الدخول</p>
          </div>

          {props.profile.devices.map((device, index) => {
            return <DeviceCard key={index} device={device} />;
          })}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default DevicesCards;
