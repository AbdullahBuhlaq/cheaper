import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import PackItem from "./PackItem";
import AddPack from "./AddPack";
import UpdatePack from "./UpdatePack";
import LoadingChart from "../../../components/LoadingChart";
import Chart from "react-apexcharts";
import getPackChart from "./functions/getPackChart";
import getPacks from "./functions/getPacks";
import Popup from "../../general/Popup";
import deletePackFunc from "./functions/deletePackFunc";
import PacksHeader from "./PacksHeader";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import HeaderButton from "../../../components/mainArea";
import "./css/packs.css";
import EmptyChart from "../../../components/EmptyChart";
import checkPermissions from "../../../functions/checkPermission";
import SuspendChart from "../../../components/SuspendChart";
import NotAllowdPage from "../../general/NotAllowedPage";

function Packs(props) {
  const [loading, setLoading] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [filter, setFilter] = useState(searchOptions.packs);

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.packs).map(async (packId, packIndex) => {
            const isTrue = await compare(filter, { name: props.packs[packId].name, duration: props.packs[packId].duration, price: props.packs[packId].price });
            if (isTrue) {
              return <PackItem key={packIndex} index={packIndex} pack={props.packs[packId]} deletePack={deletePack} setCurrentEdit={setCurrentEdit} setAddNew={setAddNew} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />;
            }
          })
        );
        setItems([...newArr]);
      };

      if (props.packs != -1) populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [props.packs, currentEdit, filter]);

  useEffect(() => {
    if (props.packs == -1 && checkPermissions(props.userInformation, ["admin.packs.all"])) getPacks(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setPacks);
  }, []);
  useEffect(() => {
    if (props.packs != -1) setLoading(false);
  }, [props.packs]);

  useEffect(() => {
    if (props.packsChart.loading && checkPermissions(props.userInformation, ["admin.packs.chart"])) getPackChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setPacksChart, props.packsChart);
  }, []);

  async function deletePack(id) {
    deletePackFunc(id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.packs, props.setPacks, props.packsChart, props.setPacksChart, props.toast);
  }

  try {
    return checkPermissions(props.userInformation, ["admin.packs.all"]) ? (
      <>
        {loading ? (
          <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Loading />
          </div>
        ) : (
          <>
            <div className="profile-main-area">
              <HeaderButton noRight={true} />

              <div className="main-categories">
                <section className="categories-left">
                  <PacksHeader userInformation={props.userInformation} setAddNew={setAddNew} filter={filter} setFilter={setFilter} />
                  <div className="packs-page-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", padding: "10px 30px" }}>
                    <div style={{ width: "100%", marginBottom: "25px" }}>
                      <section className="plan-section" style={{ flexDirection: "row", justifyContent: "right" }}>
                        {items.map((item) => {
                          return item;
                        })}
                      </section>

                      {addNew ? (
                        <>
                          <Popup setOpen={setAddNew} classes={"form-popup-small"} component={<AddPack packs={props.packs} setPacks={props.setPacks} setAddNew={setAddNew} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} navigate={props.navigate} toast={props.toast} />} />
                        </>
                      ) : null}
                      {currentEdit ? (
                        <>
                          <Popup
                            setOpen={setCurrentEdit}
                            classes={"form-popup-small"}
                            component={<UpdatePack packs={props.packs} setPacks={props.setPacks} currentEdit={props.packs[currentEdit]} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} navigate={props.navigate} toast={props.toast} />}
                          />
                        </>
                      ) : null}
                    </div>
                    <div style={{ width: "100%" }}>
                      {!checkPermissions(props.userInformation, ["admin.packs.chart"]) ? (
                        <SuspendChart width={"230%"} height={400} />
                      ) : props.packsChart.loading ? (
                        <LoadingChart width={"230%"} height={400} />
                      ) : props.packsChart.series[0].data.length + props.packsChart.series[0].data.length == 0 ? (
                        <>
                          <EmptyChart width={"230%"} height={400} />
                        </>
                      ) : (
                        <>
                          <Chart options={props.packsChart.options} series={props.packsChart.series} type="area" width={"100%"} height={400} />
                        </>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
      </>
    ) : (
      <>
        <NotAllowdPage />
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Packs;
