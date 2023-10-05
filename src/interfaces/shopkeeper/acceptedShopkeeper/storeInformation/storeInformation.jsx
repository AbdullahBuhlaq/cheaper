import { useEffect, useState } from "react";
import getGeneralCategories from "../../../../functions/getGeneralCategories";
import getPacks from "./functions/getPacks";
import getStoreInformation from "./functions/getStoreInformation";
import HeaderButton from "../../../../components/mainArea";
import StoreRight from "./StoreRight";
import StoreLeft from "./StoreLeft";
import Popup from "../../../general/Popup";
import UpdateStoreInformation from "./UpdateStoreInformation";
import getGeneralPacks from "../../../../functions/getGeneralPacks";
import getAcceptedStoreChart from "./functions/getAcceptedStoreChart";
import NewPacks from "./Packs";
import getStoreUsers from "./functions/getStoreUsers";
import NewImage from "./NewImage";
import NewStatus from "./NewStatus";

function StoreInformation(props) {
  const [loading, setLoading] = useState(true);
  const [popupStatus, setPopupStatus] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openPacks, setOpenPacks] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  useEffect(() => {
    if (props.storeChart.loading) getAcceptedStoreChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setStoreChart, props.storeChart, props.toast);
    if (props.categories == -1) getGeneralCategories(props.setCategories, props.toast);
    if (props.packs == -1) getGeneralPacks(props.setPacks, props.toast);
    if (props.storeInformation == -1) getStoreInformation(props.setStoreInformation, props.packsChart, props.setPacksChart, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
    if (props.storeUsers == -1) getStoreUsers(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setStoreUsers, props.storeUsers, props.toast, props.usersPage, props.setUsersPage);
  }, []);
  useEffect(() => {
    if (props.packs != -1 && props.storeInformation != -1 && props.storeUsers != -1) setLoading(false);
  }, [props.storeInformation, props.packs, props.storeUsers]);

  try {
    return (
      <>
        <div className="profile-main-area">
          <HeaderButton />
          <div className="main-profile">
            <StoreLeft
              setOpenStatus={setOpenStatus}
              setOpenImage={setOpenImage}
              storeUsers={props.storeUsers}
              setStoreUsers={props.setStoreUsers}
              usersPage={props.usersPage}
              setUsersPage={props.setUsersPage}
              setOpenPacks={setOpenPacks}
              packsChart={props.packsChart}
              storeChart={props.storeChart}
              setOpenUpdate={setOpenUpdate}
              storeInformation={props.storeInformation}
              setStoreInformation={props.setStoreInformation}
              packs={props.packs}
              userInformation={props.userInformation}
              setUserInformation={props.setUserInformation}
              refreshStatus={props.refreshStatus}
              setRefreshStatus={props.setRefreshStatus}
              toast={props.toast}
            />

            <StoreRight userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />
          </div>
        </div>

        {openUpdate ? (
          <Popup
            setOpen={setOpenUpdate}
            classes={"form-popup-small"}
            component={<UpdateStoreInformation categories={props.categories} storeInformation={props.storeInformation} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setOpenUpdate} setStoreInformation={props.setStoreInformation} />}
          />
        ) : openPacks ? (
          <Popup
            setOpen={setOpenPacks}
            classes={"form-popup"}
            component={<NewPacks packs={props.packs} storeInformation={props.storeInformation} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setOpenPacks} setStoreInformation={props.setStoreInformation} />}
          />
        ) : openImage ? (
          <Popup setOpen={setOpenImage} classes={"form-popup"} component={<NewImage storeInformation={props.storeInformation} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setOpenImage} setStoreInformation={props.setStoreInformation} />} />
        ) : openStatus ? (
          <Popup setOpen={setOpenStatus} classes={"form-popup"} component={<NewStatus storeInformation={props.storeInformation} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setEdit={setOpenStatus} setStoreInformation={props.setStoreInformation} />} />
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreInformation;
