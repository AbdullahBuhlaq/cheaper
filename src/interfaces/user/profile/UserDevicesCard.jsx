import DeviceCard from "../../admin/users/profileSection/DeviceCard";
import "../../admin/users/css/devices.css";

function UserDevicesCards(props) {
  try {
    return (
      <>
        <div className="advices" style={{ height: "96%", overflow: "auto" }}>
          <div className="advice-header">
            <p>سجل تسجيل الدخول</p>
          </div>

          {props.profile.devices.map((device, index) => {
            return <DeviceCard key={index} index={index} device={device} logoutDevice={props.logoutDevice} />;
          })}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserDevicesCards;
