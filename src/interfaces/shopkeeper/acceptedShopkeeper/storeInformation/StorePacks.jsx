import { useState } from "react";
import Loading from "../../../general/Loading";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import StorePackItem from "./StorePackItem";

function StorePacks(props) {
  const [openPacks, setOpenPakcs] = useState(false);

  try {
    return (
      <>
        <div className="panel panel-default" style={{ marginTop: "20px" }}>
          <div
            className="panel-heading"
            role="tab"
            id="headingOne"
            onClick={() => {
              setOpenPakcs(!openPacks);
            }}
          >
            <h4 className="panel-title">
              <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded={openPacks ? "true" : "false"} aria-controls="collapseOne">
                سجل الباقات {" (باقي " + props.storeInformation.giftPack + "عرض لاكتساب عرض مجاني)"}
              </a>
            </h4>
          </div>
          {openPacks ? (
            <>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div class="panel-body" style={{ maxHeight: "600px", overflow: "auto" }}>
                  <div class="right-area-header-wrapper">
                    <div className="received-item-line" style={{ height: "auto" }}>
                      <div className="received-items-content">
                        <div style={{ display: "flex", justifyContent: "start", width: "100%", cursor: "pointer" }}>
                          <span style={{ cursor: "pointer" }} onClick={() => props.setOpenPacks(true)}>
                            إضافة عرض جديد
                          </span>
                        </div>
                      </div>
                    </div>
                    {Object.keys(props.packs)
                      .reverse()
                      .map((itemKey, index) => {
                        return <StorePackItem key={index} item={props.packs[itemKey]} storeInformation={props.storeInformation} setStoreInformation={props.setStoreInformation} packs={props.packs} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />;
                      })}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", paddingTop: "35px", justifyContent: "space-evenly", alignItems: "center", marginRight: "5%" }}>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <span>سجل الظهور في الكروت</span>
                    {props.storeChart.loading ? <Loading /> : <Chart options={props.storeChart.options} series={props.storeChart.series} type="area" width={"400"} height={200} />}
                  </div>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <span>بيانات الباقات</span>
                    {props.packsChart.loading ? <Loading /> : <ReactApexChart options={props.packsChart.options} series={props.packsChart.series} type="bar" width={"400"} height={200} />}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StorePacks;
