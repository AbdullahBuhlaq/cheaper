import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SecondLoading from "../../general/SecondLoading";
import getStoreInformationFunc from "./functions/getStoreInformations";
import getStoreSpam from "./functions/getStoreSpam";
import getStoreEva from "./functions/getStoreEva";
import getStoreUsers from "./functions/getStoreUsers";
import getStorePacks from "./functions/getPacks";
import getStoreBlocks from "./functions/getStoreBlocks";
import { storeProfileChart } from "./data/storeChart";
import getStoreProfileChart from "./functions/getStoreChart";
import HeaderButton from "../../../components/mainArea";
import StoreProfileLeft from "./ProfileLeft";
import StoreProfileRight from "./ProfileRight";
import "./css/storeProfile.css";
import packsStoreChart from "./data/packsStoreChart";
import ProfileStoreBlocks from "./ProfileStoreBlocks";
import Popup from "../../general/Popup";
import deleteStoreBlockFunc from "./functions/deleteStoreBlockFunc";

function StoreProfile(props) {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [storeInformation, setStoreInformation] = useState(-1);
  const [packs, setPacks] = useState(-1);
  const [blocks, setBlocks] = useState(-1);
  const [spam, setSpam] = useState(-1);
  const [spamPage, setSpamPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [eva, setEva] = useState(-1);
  const [evaPage, setEvaPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [users, setUsers] = useState(-1);
  const [usersPage, setUsersPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [storeChart, setStoreChart] = useState(storeProfileChart);
  const [packsChart, setPacksChart] = useState(packsStoreChart);
  const [openBlocks, setOpenBlocks] = useState(false);

  useEffect(() => {
    if (storeInformation == -1) getStoreInformationFunc(params.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, setStoreInformation);
    if (packs == -1) getStorePacks(params.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, setPacks, setPacksChart, packsChart);
    if (spam == -1) getStoreSpam(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setSpam, spam, props.toast, spamPage, setSpamPage, params.id);
    if (eva == -1) getStoreEva(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setEva, eva, props.toast, evaPage, setEvaPage, params.id);
    if (users == -1) getStoreUsers(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setUsers, users, props.toast, usersPage, setUsersPage, params.id);
    if (storeChart.loading) getStoreProfileChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, params.id, setStoreChart, storeChart, props.toast);
  }, []);

  useEffect(() => {
    if (storeInformation != -1 && packs != -1 && spam != -1 && eva != -1 && users != -1) setLoading(false);
  }, [storeInformation, packs, spam, eva, users]);

  function deleteStoreBlock(id) {
    deleteStoreBlockFunc(id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, blocks, setBlocks, storeInformation, setStoreInformation);
  }

  try {
    return (
      <>
        {!loading ? (
          <>
            <div className="profile-main-area">
              <HeaderButton />

              <div className="main-profile">
                <StoreProfileLeft
                  setOpenBlocks={setOpenBlocks}
                  packsChart={packsChart}
                  storeChart={storeChart}
                  packs={packs}
                  store={storeInformation}
                  users={users}
                  userInformation={props.userInformation}
                  setUserInformation={props.setUserInformation}
                  refreshStatus={props.refreshStatus}
                  setRefreshStatus={props.setRefreshStatus}
                  toast={props.toast}
                  setUsers={setUsers}
                  usersPage={usersPage}
                  setUsersPage={setUsersPage}
                  id={params.id}
                />
                <StoreProfileRight
                  totalSpam={storeInformation.spam}
                  totalEva={storeInformation.evaluateAverage}
                  spam={spam}
                  eva={eva}
                  userInformation={props.userInformation}
                  setUserInformation={props.setUserInformation}
                  refreshStatus={props.refreshStatus}
                  setRefreshStatus={props.setRefreshStatus}
                  toast={props.toast}
                  setSpam={setSpam}
                  setEva={setEva}
                  spamPage={spamPage}
                  evaPage={evaPage}
                  setSpamPage={setSpamPage}
                  setEvaPage={setEvaPage}
                  id={params.id}
                />
              </div>
            </div>

            {openBlocks ? (
              <Popup
                setOpen={setOpenBlocks}
                classes={"categories-main-modal"}
                component={<ProfileStoreBlocks deleteStoreBlock={deleteStoreBlock} store={storeInformation} setStore={setStoreInformation} id={params.id} blocks={blocks} setBlocks={setBlocks} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />}
              />
            ) : null}
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <SecondLoading />
          </div>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreProfile;
