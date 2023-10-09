import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import getAcceptedStores from "./functions/getAcceptedStores";
import getPendingStores from "./functions/getPendingStores";
import AcceptedStores from "./AcceptedStores";
import PendingStores from "./PendingStores";
import Popup from "../../general/Popup";
import PopupStore from "./PopupStore";
import HeaderButton from "../../../components/mainArea";
import StoreTab from "./StoreTab";
import "./css/storeList.css";
import getCategories from "../categories/functions/getCategories";
import PopupPendingStore from "./PopupPendingStore";
import acceptStore from "./functions/acceptStore";
import deleteStore from "./functions/deleteStore";
import deleteAcceptedStoreFunc from "./functions/deleteAcceptedStoreFunc";
import enableAcceptedStoreFunc from "./functions/enableAcceptedStoreFunc";
import checkPermissions from "../../../functions/checkPermission";
import NotAllowdPage from "../../general/NotAllowedPage";

function Stores(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [currentEditType, setCurrentEditType] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [acceptedStoresPage, setAcceptedStoresPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [acceptedStoresFilter, setAcceptedStoresFilter] = useState({ search: "", city: -1, type: true, category: -1 });
  const [pendingStoresPage, setPendingStoresPage] = useState({ page: 1, size: 5, loadMore: true, loadingNow: false });
  const [pendingStoresFilter, setPendingStoresFilter] = useState({ search: "", city: -1, type: false, category: -1 });

  useEffect(() => {
    if (!currentEdit) setCurrentEditType(false);
  }, [currentEdit]);
  useEffect(() => {
    if (props.acceptedStores == -1 && checkPermissions(props.userInformation, ["admin.store.all"])) getAcceptedStores(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setAcceptedStores, props.acceptedStores, props.toast, acceptedStoresFilter, acceptedStoresPage, setAcceptedStoresPage);
    if (props.pendingStores == -1 && checkPermissions(props.userInformation, ["admin.store.all"])) getPendingStores(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setPendingStores, props.pendingStores, props.toast, pendingStoresFilter, pendingStoresPage, setPendingStoresPage);
    if (props.categories == -1) getCategories(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setCategories, props.toast);
  }, []);

  useEffect(() => {
    if (!acceptedStoresPage.loadingNow && checkPermissions(props.userInformation, ["admin.store.all"])) getAcceptedStores(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setAcceptedStores, props.acceptedStores, props.toast, acceptedStoresFilter, { ...acceptedStoresPage, page: 1, loadMore: true }, setAcceptedStoresPage);
  }, [acceptedStoresFilter]);

  useEffect(() => {
    if (!acceptedStoresPage.loadingNow && checkPermissions(props.userInformation, ["admin.store.all"])) getPendingStores(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setPendingStores, props.pendingStores, props.toast, pendingStoresFilter, { ...pendingStoresPage, page: 1, loadMore: true }, setPendingStoresPage);
  }, [pendingStoresFilter]);

  function acceptNewStore(id) {
    acceptStore(id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.acceptedStores, props.setAcceptedStores, props.pendingStores, props.setPendingStores, setCurrentEdit);
  }

  function deleteNewStore(id) {
    deleteStore(id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.acceptedStores, props.setAcceptedStores, props.pendingStores, props.setPendingStores, setCurrentEdit);
  }
  function deleteAcceptedStore(id) {
    deleteAcceptedStoreFunc(id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.acceptedStores, props.setAcceptedStores, props.pendingStores, props.setPendingStores, setCurrentEdit);
  }
  function enableAcceptedStore(id) {
    enableAcceptedStoreFunc(id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.acceptedStores, props.setAcceptedStores, props.pendingStores, props.setPendingStores, setCurrentEdit);
  }

  try {
    return checkPermissions(props.userInformation, ["admin.store.all"]) ? (
      <>
        <div className="main-area" style={{ width: "100%" }}>
          <HeaderButton />
          <div className="tab" style={{ width: "100%" }}>
            <StoreTab tabName={"مقبولين"} tabNumber={1} currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <StoreTab tabName={"معلقين"} tabNumber={2} currentTab={currentTab} setCurrentTab={setCurrentTab} />
          </div>

          <div className="tabcontent" style={{ display: "block", border: "none", width: "100%" }}>
            <section className="sales" style={{ height: "80vh" }}>
              {currentTab == 1 ? (
                <>
                  {props.acceptedStores == -1 ? (
                    <Loading />
                  ) : (
                    <>
                      <AcceptedStores
                        setCurrentEditType={setCurrentEditType}
                        acceptedStores={props.acceptedStores}
                        setAcceptedStores={props.setAcceptedStores}
                        setCurrentEdit={setCurrentEdit}
                        acceptedStoresFilter={acceptedStoresFilter}
                        setAcceptedStoresFilter={setAcceptedStoresFilter}
                        acceptedStoresPage={acceptedStoresPage}
                        setAcceptedStoresPage={setAcceptedStoresPage}
                        userInformation={props.userInformation}
                        setUserInformation={props.setUserInformation}
                        refreshStatus={props.refreshStatus}
                        setRefreshStatus={props.setRefreshStatus}
                        toast={props.toast}
                        categories={props.categories}
                      />
                    </>
                  )}
                </>
              ) : currentTab == 2 ? (
                <>
                  {props.pendingStores == -1 ? (
                    <Loading />
                  ) : (
                    <>
                      <PendingStores
                        setCurrentEditType={setCurrentEditType}
                        pendingStores={props.pendingStores}
                        setPendingStores={props.setPendingStores}
                        setCurrentEdit={setCurrentEdit}
                        pendingStoresFilter={pendingStoresFilter}
                        setPendingStoresFilter={setPendingStoresFilter}
                        pendingStoresPage={pendingStoresPage}
                        setPendingStoresPage={setPendingStoresPage}
                        userInformation={props.userInformation}
                        setUserInformation={props.setUserInformation}
                        refreshStatus={props.refreshStatus}
                        setRefreshStatus={props.setRefreshStatus}
                        toast={props.toast}
                        categories={props.categories}
                      />
                    </>
                  )}
                </>
              ) : null}
            </section>
          </div>

          {currentEdit && currentEditType == 1 ? (
            <Popup setOpen={setCurrentEdit} component={<PopupStore enableAcceptedStore={enableAcceptedStore} deleteNewStore={deleteAcceptedStore} store={currentEdit} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />} />
          ) : null}
          {currentEdit && currentEditType == 2 ? <Popup setOpen={setCurrentEdit} component={<PopupPendingStore acceptNewStore={acceptNewStore} deleteNewStore={deleteNewStore} store={currentEdit} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />} /> : null}
        </div>
      </>
    ) : (
      <>
        <NotAllowdPage />
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Stores;
