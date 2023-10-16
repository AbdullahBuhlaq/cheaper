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
import checkPermissions from "../../../functions/checkPermission";
import { FcCancel } from "react-icons/fc";

function Home(props) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (props.configs == -1 && checkPermissions(props.userInformation, ["admin.config.all"])) getConfig(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setConfigs);
  }, []);

  useEffect(() => {
    if (props.homeCount.loading && checkPermissions(props.userInformation, ["admin.home.getCount"])) getCount(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeCount, props.setHomeUserChart, props.homeUserChart, props.setHomeStoreChart, props.homeStoreChart);
    if (props.homeCartChart.loading && checkPermissions(props.userInformation, ["admin.home.cartChart"])) getCartChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeCartChart, props.homeCartChart);
    if (props.homeUserCartChart.loading && checkPermissions(props.userInformation, ["admin.home.cartChart"])) getUserCartChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeUserCartChart, props.homeUserCartChart);
    if (props.homeCityChart.loading && checkPermissions(props.userInformation, ["admin.home.cityChart"])) getCityChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeCityChart, props.homeCityChart);
    if (props.homeStoreChart.loading && checkPermissions(props.userInformation, ["admin.home.chartStores"])) getStoreChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeStoreChart, props.homeStoreChart);
    if (props.homeUserChart.loading && checkPermissions(props.userInformation, ["admin.home.chartUsers"])) getUserChart(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setHomeUserChart, props.homeUserChart);
  }, []);

  try {
    return (
      <>
        <div className="cards home-container" style={{ width: "75%", height: "100vh" }}>
          {expanded ? <div className="expanded-card-container" onClick={() => setExpanded(false)}></div> : null}
          <div className="admin-home-charts-container">
            <div className="card-row">
              <Card
                index={1}
                setExpanded={setExpanded}
                userInformation={props.userInformation}
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
                userInformation={props.userInformation}
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
                userInformation={props.userInformation}
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
                userInformation={props.userInformation}
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
            style={{
              height: "100%",
            }}
          >
            <span>{"توزع المحلات على المدن"}</span>
            {!checkPermissions(props.userInformation, ["admin.home.cityChart"]) ? (
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <span style={{ fontSize: "100px" }}>
                  <FcCancel />
                </span>
                <span>ليست لديك الصلاحية لطلب هذا الرسم البياني</span>
              </div>
            ) : (
              <div className="chartContainer" style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                {props.homeCityChart.loading ? (
                  <Loading />
                ) : (
                  <div style={{ height: "100%", width: "100%" }}>
                    <Chart options={props.homeCityChart.options} series={props.homeCityChart.options.series} type="bar" width={"100%"} height={"100%"} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div style={{ width: "25%" }}>
          {!checkPermissions(props.userInformation, ["admin.config.all"]) ? (
            <>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                <span style={{ fontSize: "100px" }}>
                  <FcCancel />
                </span>
                <span>لا تملك صلاحية عرض القيم الأساسية للموقع</span>
              </div>
            </>
          ) : props.configs == -1 ? (
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
