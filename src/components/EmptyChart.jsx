import Chart from "react-apexcharts";
import { loadingChartData } from "../data/loadingChartData";
import "../css/loadingChart.css";
import { FcDeleteDatabase } from "react-icons/fc";

function EmptyChart(props) {
  try {
    return (
      <>
        <div className="chart-loading-container">
          <div className="chart-loading-logo" style={{ width: "150%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            لا توجد بيانات{" "}
            <span style={{ marginRight: "5px" }}>
              <FcDeleteDatabase />
            </span>
          </div>
          <Chart options={loadingChartData.options} series={loadingChartData.series} type="area" width={props.width} height={props.height} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default EmptyChart;
