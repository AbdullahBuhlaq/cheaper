import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import "./css/blocks.css";
import getStoreBlocks from "./functions/getStoreBlocks";
import BlocksHeaderStore from "./blocksHeader";
import BlockCardStore from "./BlockCard";
import AddNewBlockStore from "./AddNewBlock";

function ProfileStoreBlocks(props) {
  const [duringAddForDelete, setDuringAddForDelete] = useState(false);
  const [duringAddForStop, setDuringAddForStop] = useState(false);

  useEffect(() => {
    if (props.blocks == -1) getStoreBlocks(props.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setBlocks);
  }, []);

  try {
    return (
      <>
        {props.blocks ? (
          <>
            <div className="categories-main-modal-body">
              <BlocksHeaderStore count={props.blocks.count} blocked={props.blocks.blocked} />

              <AddNewBlockStore blocks={props.blocks} setBlocks={props.setBlocks} store={props.store} setStore={props.setStore} id={props.id} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />

              <div className="categories-main-modal-body-block-history">
                {props.blocks.rows.map((block, index) => {
                  return <BlockCardStore key={index} block={block} />;
                })}
                {props.blocks.count == 0 ? "لا يوجد" : null}
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileStoreBlocks;
