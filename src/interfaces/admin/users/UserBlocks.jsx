import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import getUserBlocks from "./function/getUserBlocks";
import "./css/blocks.css";
import BlocksHeader from "./blocksSection/blocksHeader";
import AddNewBlock from "./blocksSection/AddNewBlock";
import BlockCard from "./blocksSection/BlockCard";
import stopBlockFunc from "./function/stopBlockFunc";
import deleteUserBlockFunc from "./function/deleteUserBlockFunc";

function UserBlocks(props) {
  const [userBlocks, setUserBlocks] = useState(false);
  const [duringAddForDelete, setDuringAddForDelete] = useState(false);
  const [duringAddForStop, setDuringAddForStop] = useState(false);
  useEffect(() => {
    getUserBlocks(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.currentShowBlocks.id, setUserBlocks, userBlocks, props.toast);
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
        {userBlocks ? (
          <>
            <div className="categories-main-modal-body">
              <BlocksHeader count={userBlocks.count} blocked={userBlocks.blocked} />

              {props.currentShowBlocks.disableAt ? null : (
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
              )}

              <div className="categories-main-modal-body-block-history">
                {Object.keys(userBlocks.rows).map((blockKey, index) => {
                  return <BlockCard key={index} deleteUserBlock={(id) => deleteUserBlock(id)} stopBlock={(id) => stopBlock(id)} block={userBlocks.rows[blockKey]} />;
                })}
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

export default UserBlocks;
