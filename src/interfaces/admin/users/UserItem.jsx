import { useState } from "react";

function UserItem(props) {
  const [showOptions, setShowOptions] = useState(false);
  try {
    return (
      <>
        <div className="products-row" style={{ backgroundColor: props.user.blocked ? "#ff00003b" : "initial", textDecoration: props.user.disableAt ? "line-through" : "initial", textDecorationColor: "red" }}>
          <div className="product-cell image">
            <img src={props.user.avatar ? props.user.avatar : "images/user.webp"} alt="product" />
            <span>{props.user.name}</span>
          </div>
          <div className="product-cell category">{props.user.username}@</div>
          <div className="product-cell price">{props.user.phoneNumber}</div>
          <div className="product-cell sales">{props.user.gender}</div>
          <div className="product-cell stock">{props.user.birthday}</div>
          <div className="product-cell status-cell">
            <span className={"status" + (props.user.active ? " active" : " disabled")}>{props.user.active ? "نشط" : "غير نشط"}</span>
          </div>
          <div className="product-cell option">
            <span className="cell-label">خيارات :</span>

            <div className="dropdown">
              <button
                onClick={() => {
                  setShowOptions(!showOptions);
                }}
                className="dropbtn"
              >
                •••
              </button>
              <ul className={"dropdown-content" + (showOptions ? " show" : "")}>
                <li
                  onClick={() => {
                    props.navigate("/users/" + props.user.id);
                  }}
                >
                  <div>عرض الملف الشخصي</div>
                </li>
                <li
                  onClick={() => {
                    props.setCurrentShowBlocks(props.user.id);
                  }}
                >
                  <div>عرض سجل الحظر</div>
                </li>
                <li
                  onClick={() => {
                    props.setCurrentEdit(props.user.id);
                  }}
                >
                  <div>تعديل</div>
                </li>
                {props.user.disableAt ? null : (
                  <li
                    onClick={() => {
                      props.deleteUser(props.user.id);
                    }}
                  >
                    <div>حذف</div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserItem;
