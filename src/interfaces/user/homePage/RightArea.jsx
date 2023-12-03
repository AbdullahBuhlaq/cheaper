import checkPermissions from "../../../functions/checkPermission";
import RightOfferItem from "./RightOffersItem";
import RightRecentVisited from "./RightRecentVisited";
import NotAllowdPage from "../../general/NotAllowedPage";
import Loading from "../../general/Loading";
import { FaCircleXmark } from "react-icons/fa6";

function RightArea(props) {
  try {
    return (
      <>
        <div className="new-right-area homeuser ">
          <div
            className={"btn-close-right"}
            onClick={() => {
              document.getElementsByClassName("new-right-area")[0].classList.remove("show");
            }}
          >
            <FaCircleXmark />
          </div>

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
