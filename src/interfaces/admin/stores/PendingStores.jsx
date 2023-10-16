import { useEffect, useState } from "react";
import PendingSearch from "./PendingSearch";
import PendingStoreCard from "./PendingStoreCard";
import LoadMorePendingStores from "./LoadMorePendingStores";
import acceptManyStores from "./functions/acceptManyStores";

function PendingStores(props) {
  const [selected, setSelected] = useState([]);
  async function addCard(id) {
    let tempArray = [];
    await Promise.all(
      selected.map(async (item) => {
        if (item.id != id) tempArray = [...tempArray, item];
      })
    );
    setSelected([...tempArray, props.pendingStores[id]]);
  }
  async function deleteCard(id) {
    let tempArray = [];
    await Promise.all(
      selected.map(async (item) => {
        if (item.id != id) tempArray = [...tempArray, item];
      })
    );
    setSelected([...tempArray]);
  }

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.pendingStores).map(async (storeKey, storeIndex) => {
            const isTrue = true;
            //   const isTrue = await compare(searchOptions["roles"][props.search.field], props.search.operator, props.roles[role][props.search.field], props.search.word);
            if (isTrue) {
              return <PendingStoreCard key={storeIndex} addCard={addCard} deleteCard={deleteCard} setCurrentEditType={props.setCurrentEditType} store={props.pendingStores[storeKey]} userInformation={props.userInformation} setCurrentEdit={props.setCurrentEdit} />;
            }
          })
        );
        setItems([...newArr]);
      };

      populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [props.pendingStores, props.pendingStoresFilter, selected]);

  const [duringAdd, setDuringAdd] = useState(false);
  function sendSelected() {
    acceptManyStores(setDuringAdd, selected, setSelected, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.acceptedStores, props.setAcceptedStores, props.pendingStores, props.setPendingStores);
  }

  try {
    return (
      <>
        <PendingSearch sendSelected={sendSelected} selected={selected} duringAdd={duringAdd} filter={props.pendingStoresFilter} setFilter={props.setPendingStoresFilter} usersPage={props.pendingStoresPage} setUsersPage={props.setPendingStoresPage} categories={props.categories} />
        <div style={{ height: "75vh", overflow: "auto", display: "flex", flexDirection: "column" }}>
          <div className="sales-card-section">
            {items.map((item) => {
              return item;
            })}
          </div>
          <LoadMorePendingStores
            userInformation={props.userInformation}
            setUserInformation={props.setUserInformation}
            refreshStatus={props.refreshStatus}
            setRefreshStatus={props.setRefreshStatus}
            setPendingStores={props.setPendingStores}
            pendingStores={props.pendingStores}
            toast={props.toast}
            filter={props.pendingStoresFilter}
            pendingStoresPage={props.pendingStoresPage}
            setPendingStoresPage={props.setPendingStoresPage}
          />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PendingStores;
