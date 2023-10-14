import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import "./css/blocks.css";
import getStoreBlocks from "./functions/getStoreBlocks";
import BlocksHeaderStore from "./blocksHeader";
import BlockCardStore from "./BlockCard";
import AddNewBlockStore from "./AddNewBlock";
import { FcCancel } from "react-icons/fc";
import checkPermissions from "../../../functions/checkPermission";

function ProfileStoreBlocks(props) {
  const [duringAddForDelete, setDuringAddForDelete] = useState(false);
  const [duringAddForStop, setDuringAddForStop] = useState(false);

  useEffect(() => {
    if (props.blocks == -1 && checkPermissions(props.userInformation, ["admin.store.accepted.allBlock"])) getStoreBlocks(props.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setBlocks);
  }, []);

  try {
    return (
      <>
        {props.blocks != -1 ? (
          <>
            <div className="categories-main-modal-body">
              {console.log(props.blocks)}
              <BlocksHeaderStore blocks={props.blocks} userInformation={props.userInformation} count={props.blocks.rows.length} blocked={props.blocks.blocked} />

              {checkPermissions(props.userInformation, ["admin.store.accepted.block"]) ? (
                <AddNewBlockStore blocks={props.blocks} setBlocks={props.setBlocks} store={props.store} setStore={props.setStore} id={props.id} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />
              ) : null}

              {checkPermissions(props.userInformation, ["admin.users.block.allBlockForUser"]) ? (
                props.blocks != -1 ? (
                  <div className="categories-main-modal-body-block-history">
                    {props.blocks.rows.reverse().map((block, index) => {
                      return <BlockCardStore key={index} index={index} block={block} deleteStoreBlock={props.deleteStoreBlock} />;
                    })}
                    {props.blocks.count == 0 ? "لا يوجد" : null}
                  </div>
                ) : (
                  <div style={{ display: "flex", width: "100%", height: "50%", justifyContent: "center", alignItems: "center" }}>
                    <Loading />
                  </div>
                )
              ) : (
                <div style={{ display: "flex", width: "100%", height: "50%", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <span style={{ fontSize: "80px" }}>
                    <FcCancel />
                  </span>
                  <span>لا تملك صلاحية لعرض سجل حظورات المستخدم</span>
                </div>
              )}
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
