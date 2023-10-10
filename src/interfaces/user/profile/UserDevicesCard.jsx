import DeviceCard from "../../admin/users/profileSection/DeviceCard";
import "../../admin/users/css/devices.css";

function UserDevicesCards(props) {
  try {
    return (
      <>
        <div class="advices" style={{ height: "96%", overflow: "auto" }}>
          <div class="advice-header">
            <p>سجل تسجيل الدخول</p>
          </div>

          {props.profile.devices.map((device, index) => {
            return <DeviceCard key={index} index={index} device={device} />;
          })}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserDevicesCards;
