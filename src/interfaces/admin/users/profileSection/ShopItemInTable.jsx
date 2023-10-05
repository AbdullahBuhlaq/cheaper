function ShopItemInTable(props) {
  try {
    return (
      <>
        <tr>
          <td>
            <div className="table-wrapper-info">
              <img src={props.offer.avatar ? props.offer.avatar : "../images/user.webp"} className="" />
              <p>{props.offer.nameStore}</p>
            </div>
          </td>
          <td>{props.offer.discount}%</td>
          <td>{new Date(props.offer.createdAt).toLocaleDateString()}</td>
          <td>{new Date(props.offer.dataTake).toLocaleDateString()}</td>
          <td>{props.offer.offerType}</td>
          <td>
            <a
              href="#"
              onClick={() => {
                props.setOpenStore(props.offer.id);
              }}
            >
              عرض المزيد
            </a>
          </td>
        </tr>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ShopItemInTable;
