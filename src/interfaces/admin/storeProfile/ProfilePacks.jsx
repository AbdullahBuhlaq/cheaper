import { useState } from "react";
import ProfilePackItem from "./ProfilePackItem";
import Loading from "../../general/Loading";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

function ProfilePacks(props) {
  const [openPacks, setOpenPakcs] = useState(false);

  try {
    return (
      <>
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
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div class="panel-body" style={{ maxHeight: "600px", overflow: "auto" }}>
                  <div class="right-area-header-wrapper">
                    {props.packs.map((item, index) => {
                      return <ProfilePackItem key={index} item={item} />;
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

export default ProfilePacks;
