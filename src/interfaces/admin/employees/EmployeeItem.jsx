import { useEffect, useState } from "react";
import jsonParse from "../../../functions/jsonParse";
import checkPermissions from "../../../functions/checkPermission";
import { motion } from "framer-motion";
import { userImag } from "../../../constants/story";

function EmployeeItem(props) {
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
        <motion.div className="products-row" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ ease: "linear", duration: "0.5" }}>
          <div className="product-cell image">
            <img src={props.employee.avatar ? jsonParse(props.employee.avatar)[1] : userImag} style={{ width: "32px", height: "32px", objectFit: "cover" }} />
            <span>{props.employee.name}</span>
          </div>
          <div className="product-cell category">{props.employee.username}@</div>
          <div className="product-cell price">{props.employee.phoneNumber}</div>
          <div className="product-cell sales">{props.employee.gender}</div>
          <div className="product-cell stock">{props.employee.email}</div>
          {props.roles != -1 ? <div className="product-cell stock">{props.roles[props.employee.roleId].name}</div> : null}
          <div className="product-cell option">
            <span className="cell-label">خيارات :</span>

            <div className="dropdown">
              {checkPermissions(props.userInformation, ["admin.employee.update", "admin.employee.delete"]) ? (
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
                {checkPermissions(props.userInformation, ["admin.employee.update"]) ? (
                  <li
                    onClick={() => {
                      props.setCurrentEdit(props.employee.id);
                    }}
                  >
                    <div>تعديل</div>
                  </li>
                ) : null}
                {checkPermissions(props.userInformation, ["admin.employee.delete"]) ? (
                  <li
                    onClick={() => {
                      props.deleteEmployee(props.employee.id);
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

export default EmployeeItem;
