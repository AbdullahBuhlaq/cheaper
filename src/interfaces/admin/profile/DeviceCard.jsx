import getSystemIcon from "../../../functions/getSystemIcon";

function DeviceCard(props) {
  try {
    return (
      <>
        <div class="advices-body">
          <div class="advice">
            <h1>المتصفح المستخدم : {props.device.browser}</h1>
            <h1>الجهاز المستخدم : {props.device.device}</h1>
            <h1>
              نظام التشغيل : {props.device.system + " "}
              {getSystemIcon(props.device.system)}
            </h1>
            <h2>التاريخ : {new Date(props.device.logInDate).toLocaleString()}</h2>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default DeviceCard;
