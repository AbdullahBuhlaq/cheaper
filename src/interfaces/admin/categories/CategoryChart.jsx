import { useEffect, useState } from "react";
import { categoryChartData } from "./data/categoryChartData";
import Chart from "react-apexcharts";
import LoadingChart from "../../../components/LoadingChart";
import getCategoryChart from "./functions/getCategoryChart";

function CategoryChart(props) {
  const [categoryChart, setCategoryChart] = useState(categoryChartData);

  useEffect(() => {
    if (categoryChart.loading) getCategoryChart(props.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setCategoryChart, categoryChart, props.toast, props.name);
  }, []);

  try {
    return (
      <>
        <div className="chartContainer categories-chart-container">
          {categoryChart.loading ? (
            <LoadingChart width={"100%"} height={200} />
          ) : (
            <>
              <Chart options={categoryChart.options} series={categoryChart.series} type="area" width={"100%"} height={200} />
            </>
          )}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CategoryChart;
