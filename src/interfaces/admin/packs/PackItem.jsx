import { useEffect, useState } from "react";
import checkPermissions from "../../../functions/checkPermission";
import { motion } from "framer-motion";

function PackItem(props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.className != "dropbtn") {
        setShow(false);
      }
    });
  }, []);

  try {
    return (
      <>
        <motion.div className="plan-container" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2", delay: 0.1 * props.index }}>
          <div className="plan-container-right">
            <div className="plan-container-right-header">
              <h1>{props.pack.name}</h1>

              <div className="dropdown">
                {checkPermissions(props.userInformation, ["admin.packs.update", "admin.packs.delete"]) ? (
                  <button
                    className="dropbtn"
                    onClick={() => {
                      setShow(!show);
                    }}
                  >
                    •••
                  </button>
                ) : null}
                <ul id="myDropdown" className={"dropdown-content" + (show ? " show" : "")}>
                  {checkPermissions(props.userInformation, ["admin.packs.update"]) ? (
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          props.setAddNew(false);
                          props.setCurrentEdit(props.pack.id);
                        }}
                      >
                        تعديل
                      </a>
                    </li>
                  ) : null}
                  {checkPermissions(props.userInformation, ["admin.packs.delete"]) ? (
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          props.deletePack(props.pack.id);
                        }}
                      >
                        حذف
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>

            <div className="plan-container-right-body">
              <div className="plan-container-right-body-date">
                <h1 style={{ width: "max-content" }}>الفترة : </h1>
                <h2>{props.pack.duration} يوما</h2>
              </div>

              <div className="plan-container-right-body-price">
                <h1 style={{ width: "max-content" }}>السعر : </h1>
                <h2>{props.pack.price} S.P</h2>
              </div>
            </div>

            {/* <div className="plan-container-left">
           <h1>testtttttttt</h1>
      </div> */}
          </div>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PackItem;
