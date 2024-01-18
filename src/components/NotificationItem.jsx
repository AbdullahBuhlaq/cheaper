import { userImag } from "../constants/story";

function NotificationItem(props) {
  try {
    return (
      <>
        <div className="notifications-last-update-body">
          <div className="notifications-last-update-card">
            <img src={props.item.avatar ? props.item.avatar : userImag} style={{ width: "40px", height: "40px", objectFit: "cover" }} />
            <div className="notifications-last-update-card-details">
              <h1>{props.item.title}</h1>
              <h2>{props.item.message}</h2>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default NotificationItem;
