import jsonParse from "../../../../functions/jsonParse";

function StoreUserItem(props) {
  try {
    return (
      <>
        <tr>
          <td>
            <div className="table-wrapper-info">
              <img src={props.item["user.avatar"] ? jsonParse(props.item["user.avatar"])[0] : "../images/user.webp"} className="" />
              <p>{props.item["user.name"]}</p>
            </div>
          </td>
          <td>{props.item.discount}%</td>
          <td>{new Date(props.item.createdAt).toLocaleDateString()}</td>
          <td>{props.item.dataTake ? new Date(props.item.dataTake).toLocaleDateString() : "لم يتم الاستلام"}</td>
        </tr>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreUserItem;
