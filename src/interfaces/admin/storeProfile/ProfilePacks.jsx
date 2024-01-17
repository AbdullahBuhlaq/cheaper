import { useState } from "react";
import ProfilePackItem from "./ProfilePackItem";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import SecondLoadingChart from "../../../components/SecondLoadingChart";
import SecondLoading from "../../general/SecondLoading";
import EmptyChart from "../../../components/EmptyChart";
import SuspendChart from "../../../components/SuspendChart";
import checkPermissions from "../../../functions/checkPermission";
import { motion } from "framer-motion";

function ProfilePacks(props) {
  const [openPacks, setOpenPakcs] = useState(false);

  try {
    return (
      <>
        {checkPermissions(props.userInformation, ["admin.store.accepted.packs", "admin.store.accepted.chart"]) ? (
          <div className="panel panel-default">
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
                  سجل الباقات
                </a>
              </h4>
            </div>
            {openPacks ? (
              <>
                <motion.div className="packs-container" style={{ display: "flex", flexDirection: "row" }} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, originY: "-10%", opacity: 1 }} transition={{ duration: 0.5 }}>
                  {checkPermissions(props.userInformation, ["admin.store.accepted.packs"]) && props.packs != -1 ? (
                    <div className="panel-body" style={{ maxHeight: "600px", overflow: "auto" }}>
                      <div className="right-area-header-wrapper">
                        {props.packs.map((item, index) => {
                          return <ProfilePackItem key={index} item={item} />;
                        })}
                      </div>
                    </div>
                  ) : null}

                  <div style={{ display: "flex", flexDirection: "column", paddingTop: "35px", justifyContent: "space-evenly", alignItems: "center", marginRight: "auto", marginLeft: "auto" }}>
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <span>سجل الظهور في الكروت</span>
                      {checkPermissions(props.userInformation, ["admin.store.accepted.chart"]) ? (
                        props.storeChart.loading ? (
                          <SecondLoadingChart width={"100%"} height={200} />
                        ) : props.storeChart.series[0].data.length + props.storeChart.series[1].data.length == 0 ? (
                          <EmptyChart width={"100%"} height={200} />
                        ) : (
                          <Chart options={props.storeChart.options} series={props.storeChart.series} type="area" width={"100%"} height={200} />
                        )
                      ) : (
                        <SuspendChart width={"100%"} height={200} />
                      )}
                    </div>
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <span>بيانات الباقات</span>
                      {checkPermissions(props.userInformation, ["admin.store.accepted.packs"]) ? (
                        props.packsChart.loading ? (
                          <SecondLoadingChart width={"100%"} height={200} />
                        ) : props.packsChart.series[0].data.length + props.packsChart.series[1].data.length == 0 ? (
                          <EmptyChart width={"100%"} height={200} />
                        ) : (
                          <ReactApexChart options={props.packsChart.options} series={props.packsChart.series} type="bar" width={"100%"} height={200} />
                        )
                      ) : (
                        <SuspendChart width={"100%"} height={200} />
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            ) : null}
          </div>
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfilePacks;
