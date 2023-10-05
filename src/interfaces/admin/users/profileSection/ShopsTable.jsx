import LoadMoreOffers from "./LoadMoreOffers";
import OfferSearch from "./OfferSearch";
import ShopItemInTable from "./ShopItemInTable";

function ShopsTable(props) {
  try {
    return (
      <>
        <OfferSearch filter={props.filter} setFilter={props.setFilter} usersPage={props.usersPage} setUsersPage={props.setUsersPage} />
        <div className="table-wrapper" style={{ maxHeight: "500px" }}>
          <table>
            <thead>
              <tr>
                <th>اسم المحل</th>
                <th>نسبة الحسم</th>
                <th>تاريخ الاكتساب</th>
                <th>تاريخ الاستلام</th>
                <th>النوع</th>
                <th>المزيد</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {Object.keys(props.offers).map((offer, index) => {
                return <ShopItemInTable key={index} setOpenStore={props.setOpenStore} offer={props.offers[offer]} />;
              })}
            </tbody>
            <LoadMoreOffers userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} setUsers={props.setUserOffer} users={props.offers} toast={props.toast} filter={props.filter} usersPage={props.usersPage} setUsersPage={props.setUsersPage} id={props.id} />
          </table>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ShopsTable;
