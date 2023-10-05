import { useEffect, useState } from "react";
import getCount from "./getCount";
import getCartChart from "./getCartChart";
import getCityChart from "./getCityChart";
import getStoreChart from "./getStoreChart";
import getUserChart from "./getUserChart";
import Card from "../../../components/Card";
import Chart from "react-apexcharts";
import "./css/chartsContainer.css";
import Loading from "../../general/Loading";
import getConfig from "./functions/getConfig";
import Config from "./configs";
import getUserCartChart from "./getUserCartChartData";

function Home(props) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (props.configs == -1) getConfig(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setConfigs);
  }, []);

  useEffect(() => {
    if (props.homeCount.loading) getCount(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeCount, props.setHomeUserChart, props.homeUserChart, props.setHomeStoreChart, props.homeStoreChart);
    if (props.homeCartChart.loading) getCartChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeCartChart, props.homeCartChart);
    if (props.homeUserCartChart.loading) getUserCartChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeUserCartChart, props.homeUserCartChart);
    if (props.homeCityChart.loading) getCityChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeCityChart, props.homeCityChart);
    if (props.homeStoreChart.loading) getStoreChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeStoreChart, props.homeStoreChart);
    if (props.homeUserChart.loading) getUserChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeUserChart, props.homeUserChart);
  }, []);

  try {
    return (
      <>
        <div className="cards home-container" style={{ width: "75%" }}>
          {expanded ? <div className="expanded-card-container" onClick={() => setExpanded(false)}></div> : null}
          <div className="admin-home-charts-container">
            <div className="card-row">
              <Card
                index={1}
                setExpanded={setExpanded}
                expanded={expanded}
                unit={props.homeUserChart.unit}
                title={props.homeUserChart.title}
                color={props.homeUserChart.color}
                barValue={props.homeUserChart.barValue}
                value={props.homeUserChart.value}
                png={props.homeUserChart.png}
                series={props.homeUserChart.series}
                categories={props.homeUserChart.categories}
                loading={props.homeUserChart.loading || props.homeUserChart.loadingValue}
                options={props.homeUserChart.options}
              />
              <Card
                index={2}
                setExpanded={setExpanded}
                expanded={expanded}
                unit={props.homeStoreChart.unit}
                title={props.homeStoreChart.title}
                color={props.homeStoreChart.color}
                barValue={props.homeStoreChart.barValue}
                value={props.homeStoreChart.value}
                png={props.homeStoreChart.png}
                series={props.homeStoreChart.series}
                categories={props.homeStoreChart.categories}
                loading={props.homeStoreChart.loading || props.homeStoreChart.loadingValue}
                options={props.homeStoreChart.options}
              />
            </div>
            <div className="card-row">
              <Card
                index={3}
                setExpanded={setExpanded}
                expanded={expanded}
                unit={props.homeCartChart.unit}
                title={props.homeCartChart.title}
                color={props.homeCartChart.color}
                barValue={props.homeCartChart.barValue}
                value={props.homeCartChart.value}
                png={props.homeCartChart.png}
                series={props.homeCartChart.series}
                categories={props.homeCartChart.categories}
                loading={props.homeCartChart.loading}
                options={props.homeCartChart.options}
              />
              <Card
                index={4}
                setExpanded={setExpanded}
                expanded={expanded}
                unit={props.homeUserCartChart.unit}
                title={props.homeUserCartChart.title}
                color={props.homeUserCartChart.color}
                barValue={props.homeUserCartChart.barValue}
                value={props.homeUserCartChart.value}
                png={props.homeUserCartChart.png}
                series={props.homeUserCartChart.series}
                categories={props.homeUserCartChart.categories}
                loading={props.homeUserCartChart.loading}
                options={props.homeUserCartChart.options}
              />
            </div>
          </div>

          <div
            className="cityChart"
            style={
              {
                // background: props.homeCityChart.color.backGround,
                // boxShadow: props.homeCityChart.color.boxShadow,
              }
            }
          >
            <span>{"توزع المحلات على المدن"}</span>
            <div className="chartContainer" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
              {props.homeCityChart.loading ? <Loading /> : <Chart options={props.homeCityChart.options} series={props.homeCityChart.options.series} type="bar" width={"280%"} height={"225%"} />}
            </div>
          </div>
        </div>
        <div style={{ width: "25%" }}>
          {props.configs == -1 ? (
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Loading />
            </div>
          ) : (
            <Config configs={props.configs} setConfigs={props.setConfigs} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />
          )}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Home;
