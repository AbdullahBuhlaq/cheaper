import { Fragment, useEffect, useState } from "react";
import PackCard from "./PackCard";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";
import ShopsTable from "./ShopsTable";
import StatusImages from "./StatusImages";
import checkPermissions from "../../../../functions/checkPermission";
import SuspendChart from "../../../../components/SuspendChart";
import { loadingChartData } from "../../../../data/loadingChartData";
import Chart from "react-apexcharts";
import { FcCancel, FcDeleteDatabase } from "react-icons/fc";
import SecondLoadingChart from "../../../../components/SecondLoadingChart";
import SecondLoading from "../../../general/SecondLoading";
import EmptyChart from "../../../../components/EmptyChart";

function ProfileLeft(props) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.className != "dropbtn") {
        setShow(false);
      }
    });
  }, []);

  try {
    return (
      <>
        <div className="profile-left">
          <div className="main-header-titel">
            <h1 href="#">
              الملف الشخصي للمستخدم<tag style={{ color: "red" }}>{props.userProfile.information.disableAt ? " ( محذوف )" : null}</tag>
            </h1>

            <div className="dropdown">
              {checkPermissions(props.userInformation, ["admin.users.block.information", "admin.users.update", "admin.users.delete", "admin.users.block.allBlockForUser", "admin.users.block.deleteBlock", "admin.users.block.multiUnBlock", "admin.users.block.blockUser"]) ? (
                <button
                  onClick={() => {
                    setShow(!show);
                  }}
                  className="dropbtn"
                >
                  •••
                </button>
              ) : null}
              <ul className={"dropdown-content" + (show ? " show" : "")}>
                {checkPermissions(props.userInformation, ["admin.users.block.allBlockForUser", "admin.users.block.deleteBlock", "admin.users.block.multiUnBlock", "admin.users.block.blockUser"]) ? (
                  <li
                    onClick={() => {
                      props.setShowBlocks(true);
                    }}
                  >
                    <div>عرض سجل الحظر</div>
                  </li>
                ) : null}
                {checkPermissions(props.userInformation, ["admin.users.update"]) ? (
                  <li
                    onClick={() => {
                      props.setCurrentEdit(true);
                    }}
                  >
                    <div>تعديل</div>
                  </li>
                ) : null}
                {props.userProfile.information.disableAt ? null : checkPermissions(props.userInformation, ["admin.users.delete"]) ? (
                  <li
                    onClick={() => {
                      props.deleteUser(props.userProfile.information.id);
                    }}
                  >
                    <div>حذف</div>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          <ProfileHeader userProfile={props.userProfile} />

          <ProfileDetails userProfile={props.userProfile} />
          <div style={{ marginTop: "30px", position: "relative" }}>
            {checkPermissions(props.userInformation, ["admin.users.block.chartUser"]) ? (
              <>
                {props.userChart.loading ? (
                  <>
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <span>إحصائيات شراء العروض</span>
                    </div>
                    <div style={{ width: "100%", position: "absolute", top: "-25%", right: "10%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <div className="loading-container">
                        <video className="loading-video" autoPlay loop muted playsInline style={{ backgroundColor: "transparent", width: "100px", marginLeft: "40%", marginTop: "50px" }}>
                          <source src="../videos/1.webm" type="video/webm" />
                        </video>
                      </div>
                    </div>
                    <Chart options={loadingChartData.options} series={loadingChartData.series} type="area" width={"100%"} height={200} />
                  </>
                ) : props.userChart.series[0].data.length + props.userChart.series[0].data.length == 0 ? (
                  <>
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <span>إحصائيات شراء العروض</span>
                    </div>
                    <div style={{ width: "100%", position: "absolute", top: "-22%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      لا توجد بيانات{" "}
                      <span style={{ marginRight: "5px" }}>
                        <FcDeleteDatabase />
                      </span>
                    </div>
                    <Chart options={loadingChartData.options} series={loadingChartData.series} type="area" width={"100%"} height={200} />
                  </>
                ) : (
                  <>
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <span>إحصائيات شراء العروض</span>
                    </div>
                    <Chart options={props.userChart.options} series={props.userChart.series} type="area" width={"100%"} height={200} />
                  </>
                )}
              </>
            ) : (
              <>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <span>إحصائيات شراء العروض</span>
                </div>
                <div style={{ position: "absolute", zIndex: 30, top: "0", right: "-15%", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <span style={{ fontSize: "80px" }}>
                    <FcCancel />
                  </span>
                  <span>لا تملك صلاحية لعرض الرسم البياني</span>
                </div>
                <Chart options={loadingChartData.options} series={loadingChartData.series} type="area" width={"100%"} height={200} />
              </>
            )}
            {checkPermissions(props.userInformation, ["admin.users.block.offerUser"]) && props.offers != -1 ? (
              <ShopsTable
                setOpenStore={props.setOpenStore}
                offers={props.offers}
                filter={props.filter}
                setFilter={props.setFilter}
                usersPage={props.usersPage}
                setUsersPage={props.setUsersPage}
                userInformation={props.userInformation}
                setUserInformation={props.setUserInformation}
                refreshStatus={props.refreshStatus}
                setRefreshStatus={props.setRefreshStatus}
                setUserOffer={props.setUserOffer}
                toast={props.toast}
                id={props.id}
              />
            ) : null}
          </div>

          {/* <div className="panel panel-default">
            <div
              className="panel-heading"
              role="tab"
              id="headingOne"
              onClick={() => {
                setOpenCollapse(!openCollapse);
              }}
            >
              <h4 className="panel-title">
                <a className={openCollapse ? "collapsed" : ""} role="button">
                  Collapsible Group Item #2
                </a>
              </h4>
            </div>

            {openCollapse ? (
              <>
                <div id="collapseOne" className="panel-collapse collapse" aria-expanded="false" style={{ height: "0px" }}>
                  <div className="panel-body">
                    <div className="right-area-header-wrapper">
                      <PackCard />
                      <PackCard />
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div> */}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileLeft;
