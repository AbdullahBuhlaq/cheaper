import { useEffect, useState } from "react";
import deleteCategory from "./functions/deleteCategory";
import * as faw from "react-icons/fc";
import CategoryChart from "./CategoryChart";
import checkPermissions from "../../../functions/checkPermission";
import { motion } from "framer-motion";

function CategoryItem(props) {
  const [openDropDown, setOpenDropDown] = useState(false);

  function getIcon(iconName) {
    const Cur = faw[iconName];
    if (Cur) {
      return <Cur />;
    } else {
      return "";
    }
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.className != "cat-dropbtn") {
        setOpenDropDown(false);
      }
    });
  }, []);

  try {
    return (
      <>
        <div className="categories-container">
          <div className="categories-card">
            <div className="categories-card-header">
              <h1>{props.category.name}</h1>
              <div className="dropdown">
                {checkPermissions(props.userInformation, ["admin.category.update", "admin.category.delete"]) ? (
                  <button
                    className="cat-dropbtn"
                    onClick={() => {
                      setOpenDropDown(!openDropDown);
                    }}
                  >
                    •••
                  </button>
                ) : null}

                <ul id="myDropdown" className={"dropdown-content" + (openDropDown ? " show" : "")}>
                  {checkPermissions(props.userInformation, ["admin.category.update"]) ? (
                    <li>
                      <div
                        onClick={() => {
                          props.setAddNew(false);
                          props.setCurrentEdit(props.category.id);
                        }}
                      >
                        تعديل
                      </div>
                    </li>
                  ) : null}
                  {checkPermissions(props.userInformation, ["admin.category.delete"]) ? (
                    <li>
                      <div
                        onClick={() => {
                          deleteCategory(props.category.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.categories, props.setCategories, props.toast);
                        }}
                      >
                        حذف
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
            <div className="categories-card-content">
              <div className="categories-card-icon">{getIcon(props.category.emoji)}</div>
              <motion.div className="categories-card-details" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2" }}>
                <h1>{props.category.count.offerTaken}</h1>
                <h2>العروض</h2>
              </motion.div>
              <motion.div className="categories-card-details" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2", delay: 0.1 }}>
                <h1>{props.category.count.user}</h1>
                <h2>المستخدمين</h2>
              </motion.div>
              <motion.div className="categories-card-details" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2", delay: 0.2 }}>
                <h1>{props.category.count.store}</h1>
                <h2>المحلات</h2>
              </motion.div>
              <motion.div className="categories-card-details" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2", delay: 0.3 }}>
                <h1>{props.category.checkWithImageOrNot == "مع صور حالات" ? "نعم" : "لا"}</h1>
                <h2 style={{ width: "max-content" }}>صور حالات</h2>
              </motion.div>
              <CategoryChart id={props.category.id} name={props.category.name} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CategoryItem;
