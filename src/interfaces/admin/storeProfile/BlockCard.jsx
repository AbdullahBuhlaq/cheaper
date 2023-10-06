import { useEffect, useState } from "react";
import { reversePermissions, reverseShow } from "../../../constants/reversePermissions";

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
        <div className="categories-main-modal-body-block-history-card">
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
                من {new Date(props.block["block_date"]).toLocaleString()} إلى {new Date(new Date(props.block["block_date"]).setDate(new Date(props.block["block_date"]).getDate() + props.block["block.duration"])).toLocaleString()}
              </h1>
              <h2>{props.block["block.duration"]} يوما</h2>
            </div>
            {props.block["unblock_date"] ? (
              <div className="categories-main-modal-body-block-history-card-body-header">
                <h1>تاريخ فك الحظر: {new Date(props.block["unblock_date"]).toLocaleString()}</h1>
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
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BlockCardStore;
