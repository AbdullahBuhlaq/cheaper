import Loading from "../../general/Loading";
import Chart from "react-apexcharts";

function UserChart(props) {
  try {
    return (
      <>
        <div className="user-chart">
          {props.chartData.loading ? (
            <div className="loading-area-container">
              <Loading />
            </div>
          ) : (
            <Chart options={props.chartData.options} series={props.chartData.series} type="donut" />
          )}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserChart;
