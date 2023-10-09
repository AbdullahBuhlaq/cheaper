import Chart from "react-apexcharts";
import { loadingChartData } from "../data/loadingChartData";
import { FcCancel } from "react-icons/fc";
import "../css/loadingChart.css";
function SuspendChart(props) {
  try {
    return (
      <>
        <div className="chart-loading-container">
          <div style={{ position: "absolute", zIndex: 30, top: "0", right: "0", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <span style={{ fontSize: "80px" }}>
              <FcCancel />
            </span>
            <span>لا تملك صلاحية لعرض الرسم البياني</span>
          </div>
          <Chart options={loadingChartData.options} series={loadingChartData.series} type="area" width={props.width} height={props.height} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SuspendChart;
