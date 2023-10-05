import { useEffect, useState } from "react";
import AcceptedSearch from "./AcceptedSearch";
import AcceptedStoreCard from "./AcceptedStoreCard";
import LoadMoreAcceptedStores from "./LoadMoreAcceptedStores";

function AcceptedStores(props) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.acceptedStores).map(async (storeKey, storeIndex) => {
            const isTrue = true;
            //   const isTrue = await compare(searchOptions["roles"][props.search.field], props.search.operator, props.roles[role][props.search.field], props.search.word);
            if (isTrue) {
              return <AcceptedStoreCard key={storeIndex} setCurrentEditType={props.setCurrentEditType} store={props.acceptedStores[storeKey]} setCurrentEdit={props.setCurrentEdit} />;
            }
          })
        );
        setItems([...newArr]);
      };

      populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [props.acceptedStores, props.acceptedStoresFilter]);

  try {
    return (
      <>
        <AcceptedSearch filter={props.acceptedStoresFilter} setFilter={props.setAcceptedStoresFilter} usersPage={props.acceptedStoresPage} setUsersPage={props.setAcceptedStoresPage} categories={props.categories} />
        <div style={{ height: "75vh", overflow: "auto", display: "flex", flexDirection: "column" }}>
          <div className="sales-card-section">
            {items.map((item) => {
              return item;
            })}
          </div>
          <LoadMoreAcceptedStores
            userInformation={props.userInformation}
            setUserInformation={props.setUserInformation}
            refreshStatus={props.refreshStatus}
            setRefreshStatus={props.setRefreshStatus}
            setAcceptedStores={props.setAcceptedStores}
            acceptedStores={props.acceptedStores}
            toast={props.toast}
            filter={props.acceptedStoresFilter}
            acceptedStoresPage={props.acceptedStoresPage}
            setAcceptedStoresPage={props.setAcceptedStoresPage}
          />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AcceptedStores;
