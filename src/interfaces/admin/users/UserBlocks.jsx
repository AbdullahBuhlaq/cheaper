import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import getUserBlocks from "./function/getUserBlocks";
import "./css/blocks.css";
import BlocksHeader from "./blocksSection/blocksHeader";
import AddNewBlock from "./blocksSection/AddNewBlock";
import BlockCard from "./blocksSection/BlockCard";
import stopBlockFunc from "./function/stopBlockFunc";
import deleteUserBlockFunc from "./function/deleteUserBlockFunc";
import checkPermissions from "../../../functions/checkPermission";
import { FcCancel } from "react-icons/fc";

function UserBlocks(props) {
  const [userBlocks, setUserBlocks] = useState(false);
  const [duringAddForDelete, setDuringAddForDelete] = useState(false);
  const [duringAddForStop, setDuringAddForStop] = useState(false);
  useEffect(() => {
    if (checkPermissions(props.userInformation, ["admin.users.block.allBlockForUser"])) getUserBlocks(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.currentShowBlocks.id, setUserBlocks, userBlocks, props.toast);
  }, []);

  async function stopBlock(id) {
    stopBlockFunc(props.usersBlockedChart, props.setUsersBlockedChart, props.blocks, userBlocks, setUserBlocks, props.users, props.setUsers, id, props.currentShowBlocks, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAddForStop, props.toast);
  }

  async function deleteUserBlock(id) {
    deleteUserBlockFunc(props.usersBlockedChart, props.setUsersBlockedChart, props.blocks, userBlocks, setUserBlocks, props.users, props.setUsers, id, props.currentShowBlocks, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAddForDelete, props.toast);
  }

  try {
    return (
      <>
        <>
          <div className="categories-main-modal-body">
            <BlocksHeader userBlocks={userBlocks} userInformation={props.userInformation} count={userBlocks.count} blocked={userBlocks.blocked} />

            {props.currentShowBlocks.disableAt ? null : checkPermissions(props.userInformation, ["admin.users.block.blockUser"]) && props.blocks != -1 ? (
              <AddNewBlock
                usersBlockedChart={props.usersBlockedChart}
                setUsersBlockedChart={props.setUsersBlockedChart}
                userBlocks={userBlocks}
                setUserBlocks={setUserBlocks}
                users={props.users}
                setUsers={props.setUsers}
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
                  {Object.keys(userBlocks.rows)
                    .reverse()
                    .map((blockKey, index) => {
                      return <BlockCard key={index} index={index} userInformation={props.userInformation} deleteUserBlock={(id) => deleteUserBlock(id)} stopBlock={(id) => stopBlock(id)} block={userBlocks.rows[blockKey]} />;
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
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserBlocks;
