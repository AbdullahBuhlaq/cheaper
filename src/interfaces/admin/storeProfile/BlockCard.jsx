import { useEffect, useState } from "react";
import { reversePermissions, reverseShow } from "../../../constants/reversePermissions";
import { motion } from "framer-motion";

function BlockCardStore(props) {
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
        <motion.div className="categories-main-modal-body-block-history-card" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2", delay: props.index * 0.1 }} style={props.block["unblock_date"] ? {} : { backgroundColor: "rgba(255, 0, 0, .2)" }}>
          <div className="categories-main-modal-body-block-history-card-header">
            <h1>{props.block["block.reason"]}</h1>
            <div className="dropdown">
              <button
                onClick={() => {
                  setShow(!show);
                }}
                className="dropbtn"
              >
                •••
              </button>
              <ul id="myDropdown" className={"dropdown-content" + (show ? " show" : "")}>
                <li>
                  <a href="#" onClick={() => props.deleteStoreBlock(props.block.id)}>
                    حذف الحظر
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="categories-main-modal-body-block-history-card-body">
            <div className="categories-main-modal-body-block-history-card-body-header">
              <h1>
                من {new Date(props.block["block_date"]).toLocaleDateString()} إلى {new Date(new Date(props.block["block_date"]).setDate(new Date(props.block["block_date"]).getDate() + props.block["block.duration"])).toLocaleDateString()}
              </h1>
              <h2>{props.block["block.duration"]} يوما</h2>
            </div>
            {props.block["unblock_date"] ? (
              <div className="categories-main-modal-body-block-history-card-body-header">
                <h1>تاريخ فك الحظر: {new Date(props.block["unblock_date"]).toLocaleDateString()}</h1>
              </div>
            ) : null}
            <div className="categories-main-modal-body-block-history-card-body-details">
              <div>محظور عن:</div>
              {props.block["block.restrictions"].action.map((action, index) => {
                return <h1 key={index}>{reversePermissions[action]}</h1>;
              })}
              {props.block["block.restrictions"].show.map((show, index) => {
                return <h1 key={index}>{reverseShow[show]}</h1>;
              })}
            </div>
          </div>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BlockCardStore;
