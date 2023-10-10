import checkPermissions from "../../../functions/checkPermission";
import RightOfferItem from "./RightOffersItem";
import RightRecentVisited from "./RightRecentVisited";
import NotAllowdPage from "../../general/NotAllowedPage";
import Loading from "../../general/Loading";

function RightArea(props) {
  try {
    return (
      <>
        <div className="right-area homeuser">
          <button className="btn-close-right">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-x-circle" viewBox="0 0 24 24">
              <defs></defs>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M15 9l-6 6M9 9l6 6"></path>
            </svg>
          </button>

          <div style={{ height: "48%", overflow: "auto", marginBottom: "2%" }}>
            {checkPermissions(props.userInformation, ["user.home"]) ? (
              props.homeInfo != -1 ? (
                <>
                  <div className="right-area-header-wrapper">
                    <p className="right-area-header">الأوقات المتبقية للعروض</p>
                  </div>

                  {props.homeInfo.offerNotTakeYet.map((item, index) => {
                    return <RightOfferItem key={index} index={index} item={item} />;
                  })}
                </>
              ) : (
                <>
                  <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Loading />
                  </div>
                </>
              )
            ) : (
              <NotAllowdPage />
            )}
          </div>

          <div style={{ height: "48%" }}>
            {checkPermissions(props.userInformation, ["user.home"]) ? (
              props.homeInfo != -1 ? (
                <>
                  <div className="right-area-header-wrapper">
                    <p className="right-area-header">المتاجر التي قمت بزيارتها</p>
                  </div>
                  {props.homeInfo.recentVisited.map((item, index) => {
                    return <RightRecentVisited key={index} index={index} item={item} />;
                  })}
                </>
              ) : (
                <>
                  <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Loading />
                  </div>
                </>
              )
            ) : (
              <NotAllowdPage />
            )}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default RightArea;
