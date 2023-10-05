function NotificationItem(props) {
  try {
    return (
      <>
        <div class="notifications-last-update-body">
          <div class="notifications-last-update-card">
            <img src={props.item.avatar ? props.item.avatar : "../images/user.webp"} alt="" />
            <div class="notifications-last-update-card-details">
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
