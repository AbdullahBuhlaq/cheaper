import Chart from "react-apexcharts";
import { loadingChartData } from "../data/loadingChartData";
import "../css/loadingChart.css";
import SecondLoading from "../interfaces/general/SecondLoading";
function SecondLoadingChart(props) {
  try {
    return (
      <>
        <div className="chart-loading-container">
          <div className="chart-loading-logo">
            <SecondLoading />
          </div>
          <Chart options={loadingChartData.options} series={loadingChartData.series} type="area" width={props.width} height={props.height} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SecondLoadingChart;
