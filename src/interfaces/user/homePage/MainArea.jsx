import HeaderButton from "../../../components/mainArea";
import CardsArea from "./CardsArea";
import GiftIcon from "./GiftIcon";
import StatisticsArea from "./StatisticsArea";

function MainArea(props) {
  try {
    return (
      <>
        <div className="main-area">
          {props.homeInfo.countYourGift > 0 ? <GiftIcon setIsGift={props.setIsGift} setOpenOffer={props.setOpenOffer} /> : null}

          <div className="main-area-header">
            <img className="wrapper" src="images/bg.png" />
          </div>
          {props.homeInfo == -1 ? null : <StatisticsArea homeInfo={props.homeInfo} />}

          <CardsArea setOpenOffer={props.setOpenOffer} userInformation={props.userInformation} canOpen={props.homeInfo.freeBoxToday} toast={props.toast} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default MainArea;
