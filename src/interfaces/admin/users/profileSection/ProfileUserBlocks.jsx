import { useEffect, useState } from "react";
import Loading from "../../../general/Loading";
import "../css/blocks.css";
import getUserBlocks2 from "./function/getUserBlocks";
import stopBlockFunc2 from "./function/stopBlockFunc";
import deleteUserBlockFunc2 from "./function/deleteUserBlockFunc";
import BlockCard from "../blocksSection/BlockCard";
import BlocksHeader from "../blocksSection/blocksHeader";
import AddNewBlock from "../blocksSection/AddNewBlock";
import AddNewBlockProfile from "./AddNewBlockProfile";
import getBlocks from "../../blocks/functions/getBlocks";
import checkPermissions from "../../../../functions/checkPermission";
import { FcCancel } from "react-icons/fc";

function ProfileUserBlocks(props) {
  const [userBlocks, setUserBlocks] = useState(false);
  const [duringAddForDelete, setDuringAddForDelete] = useState(false);
  const [duringAddForStop, setDuringAddForStop] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (props.blocks == -1 && checkPermissions(props.userInformation, ["admin.block.all"])) getBlocks(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setBlocks, props.toast);
    if (checkPermissions(props.userInformation, ["admin.users.block.allBlockForUser"])) getUserBlocks2(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.currentShowBlocks.id, setUserBlocks, userBlocks, props.toast);
  }, []);

  useEffect(() => {
    if (props.blocks != -1) setLoading(false);
  }, [props.blocks]);

  async function stopBlock(id) {
    stopBlockFunc2(props.blocks, userBlocks, setUserBlocks, id, props.currentShowBlocks, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAddForStop, props.toast);
  }

  async function deleteUserBlock(id) {
    deleteUserBlockFunc2(props.blocks, userBlocks, setUserBlocks, id, props.currentShowBlocks, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAddForDelete, props.toast);
  }

  try {
    return (
      <>
        {!loading ? (
          <>
            <div className="categories-main-modal-body">
              <BlocksHeader userBlocks={userBlocks} userInformation={props.userInformation} count={userBlocks.count} blocked={userBlocks.blocked} />

              {checkPermissions(props.userInformation, ["admin.users.block.blockUser"] && props.blocks != -1) ? (
                <AddNewBlockProfile
                  userBlocks={userBlocks}
                  setUserBlocks={setUserBlocks}
                  blocks={props.blocks}
                  setCurrentShowBloks={props.setCurrentShowBloks}
                  currentShowBlocks={props.currentShowBlocks}
                  userInformation={props.userInformation}
                  setUserInformation={props.setUserInformation}
                  refreshStatus={props.refreshStatus}
                  setRefreshStatus={props.setRefreshStatus}
                  toast={props.toast}
                  navigate={props.navigate}
                />
              ) : null}

              {checkPermissions(props.userInformation, ["admin.users.block.allBlockForUser"]) ? (
                userBlocks ? (
                  <div className="categories-main-modal-body-block-history">
                    {Object.keys(userBlocks.rows).map((blockKey, index) => {
                      return <BlockCard key={index} deleteUserBlock={(id) => deleteUserBlock(id)} stopBlock={(id) => stopBlock(id)} block={userBlocks.rows[blockKey]} />;
                    })}
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

export default ProfileUserBlocks;
