import { useEffect, useState } from "react";

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
        <div className="products-row">
          <div className="product-cell image">
            <img src={props.employee.avatar ? props.employee.avatar : "images/user.webp"} alt="product" />
            <span>{props.employee.name}</span>
          </div>
          <div className="product-cell category">{props.employee.username}@</div>
          <div className="product-cell price">{props.employee.phoneNumber}</div>
          <div className="product-cell sales">{props.employee.gender}</div>
          <div className="product-cell stock">{props.employee.email}</div>
          <div className="product-cell stock">{props.roles[props.employee.roleId].name}</div>
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
                    props.setCurrentEdit(props.employee.id);
                  }}
                >
                  <div>تعديل</div>
                </li>
                <li
                  onClick={() => {
                    props.deleteEmployee(props.employee.id);
                  }}
                >
                  <div>حذف</div>
                </li>
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

export default EmployeeItem;
