import { useEffect, useState } from "react";
import checkPermissions from "../../../functions/checkPermission";
import jsonParse from "../../../functions/jsonParse";
import { motion } from "framer-motion";

function UserItem(props) {
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.className != "dropbtn") {
        setShowOptions(false);
      }
    });
  }, []);

  try {
    return (
      <>
        {console.log(props.user)}
        <motion.div className="products-row" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ ease: "linear", duration: "0.5" }} style={{ backgroundColor: props.user.blocked ? "#ff00003b" : "initial", textDecoration: props.user.disableAt ? "line-through" : "initial", textDecorationColor: "red" }}>
          <div className="product-cell image">
            <img src={props.user.avatar ? jsonParse(props.user.avatar)[1] : "images/user.webp"} alt="product" />
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
              {checkPermissions(props.userInformation, ["admin.users.block.information", "admin.users.update", "admin.users.delete", "admin.users.block.allBlockForUser", "admin.users.block.deleteBlock", "admin.users.block.multiUnBlock", "admin.users.block.blockUser"]) ? (
                <button
                  onClick={() => {
                    setShowOptions(!showOptions);
                  }}
                  className="dropbtn"
                >
                  •••
                </button>
              ) : null}
              <ul className={"dropdown-content" + (showOptions ? " show" : "")}>
                {checkPermissions(props.userInformation, ["admin.users.block.information"]) ? (
                  <li
                    onClick={() => {
                      props.navigate("/users/" + props.user.id);
                    }}
                  >
                    <div>عرض الملف الشخصي</div>
                  </li>
                ) : null}
                {checkPermissions(props.userInformation, ["admin.users.block.allBlockForUser", "admin.users.block.deleteBlock", "admin.users.block.multiUnBlock", "admin.users.block.blockUser"]) ? (
                  <li
                    onClick={() => {
                      props.setCurrentShowBlocks(props.user.id);
                    }}
                  >
                    <div>عرض سجل الحظر</div>
                  </li>
                ) : null}
                {checkPermissions(props.userInformation, ["admin.users.update"]) ? (
                  <li
                    onClick={() => {
                      props.setCurrentEdit(props.user.id);
                    }}
                  >
                    <div>تعديل</div>
                  </li>
                ) : null}
                {props.user.disableAt ? null : checkPermissions(props.userInformation, ["admin.users.delete"]) ? (
                  <li
                    onClick={() => {
                      props.deleteUser(props.user.id);
                    }}
                  >
                    <div>حذف</div>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserItem;
