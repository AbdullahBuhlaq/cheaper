import { useState } from "react";

import blockStore from "./functions/blockStore";
import unblockStore from "./functions/unblockStore";

function AddNewBlockStore(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  try {
    return (
      <>
        <div className="categories-main-modal-body-add-blocks">
          <div className="categories-main-modal-body-add-blocks-action-botton">
            {props.store.block ? (
              <button
                onClick={() => {
                  unblockStore(props.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.blocks, props.setBlocks, props.store, props.setStore);
                }}
              >
                فك الحظر
              </button>
            ) : (
              <button
                onClick={() => {
                  blockStore(props.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.blocks, props.setBlocks, props.store, props.setStore);
                }}
              >
                حظر المحل
              </button>
            )}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddNewBlockStore;
