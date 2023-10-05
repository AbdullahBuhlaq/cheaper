import { useState } from "react";
import PackCard from "./PackCard";
import ProfileDetails from "./ProfileDetails";
import ProfileHeader from "./ProfileHeader";
import ShopsTable from "./ShopsTable";
import StatusImages from "./StatusImages";
import Chart from "react-apexcharts";

function ProfileLeft(props) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [show, setShow] = useState(false);

  try {
    return (
      <>
        <div className="profile-left">
          <div className="main-header-titel">
            <h1 href="#">الملف الشخصي للمستخدم</h1>
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => {
                  setShow(!show);
                }}
              >
                •••
              </button>
              <ul id="myDropdown" className={"dropdown-content" + (show ? " show" : "")}>
                <li>
                  <a href="#" onClick={() => props.setShowBlocks(true)}>
                    عرض قائمة الحظورات
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => props.setCurrentEdit(true)}>
                    تعديل
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => props.deleteUser(props.userProfile.infoUser.id)}>
                    حذف
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <ProfileHeader userProfile={props.userProfile} />

          <ProfileDetails userProfile={props.userProfile} />
          <div style={{ width: "100%", textAlign: "center" }}>
            <span>إحصائيات شراء العروض</span>
          </div>
          <Chart options={props.userChart.options} series={props.userChart.series} type="area" width={"100%"} height={200} />

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
