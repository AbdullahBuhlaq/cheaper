import HeaderButton from "../../../components/mainArea";
import LoadMoreCards from "./LoadMoreCards";
import OfferCard from "./OfferCard";
import OfferSearch from "./OfferSearch";

function OffersMainArea(props) {
  try {
    return (
      <>
        <div className="main-area">
          <HeaderButton />

          <OfferSearch
            filter={props.filter}
            setFilter={props.setFilter}
            usersPage={props.offersPage}
            setUsersPage={props.setOffersPage}
            offers={props.offers}
            setOffers={props.setOffers}
            categories={props.categories}
            userInformation={props.userInformation}
            setUserInformation={props.setUserInformation}
            refreshStatus={props.refreshStatus}
            setRefreshStatus={props.setRefreshStatus}
            toast={props.toast}
            navigate={props.navigate}
          />

          <section className="sales" style={{ width: "100%" }}>
            <h1 className="section-header">سجل العروض</h1>

            <div className="sales-card-section">
              {Object.keys(props.offers).map((itemKey, index) => {
                return <OfferCard key={index} item={props.offers[itemKey]} setOpenOffer={props.setOpenOffer} setCurrentOffer={props.setCurrentOffer} />;
              })}
            </div>
            <LoadMoreCards userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} setUsers={props.setOffers} users={props.offers} toast={props.toast} filter={props.filter} usersPage={props.offersPage} setUsersPage={props.setOffersPage} />
          </section>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default OffersMainArea;
