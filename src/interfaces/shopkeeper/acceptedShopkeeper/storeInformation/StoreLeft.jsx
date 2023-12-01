import { useEffect, useState } from "react";
import { defaultStory } from "../../../../constants/story";
import AutoSlidingImages from "../../../admin/users/profileSection/AutoSlider";
import StoreHeader from "./StoreHeader";
import StoreOptions from "./StoreOptions";
import StorePacks from "./StorePacks";
import StoreUsers from "./StoreUsers";
import jsonParse from "../../../../functions/jsonParse";
import Loading from "../../../general/Loading";
import Map from "../../../../components/Map";

function StoreLeft(props) {
  const [story, setStory] = useState(-1);
  async function getStory() {
    let newStory = [];

    await Promise.all(
      props.storeInformation.story.map((item) => {
        newStory = [...newStory, jsonParse(item.path)[3]];
      })
    );

    setStory(newStory);
  }
  useEffect(() => {
    if (props.storeInformation != -1) getStory();
  }, [props.storeInformation]);
  try {
    return (
      <>
        {story == -1 ? (
          <div className="profile-left">
            <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
              <Loading />
            </div>
          </div>
        ) : (
          <div className="profile-left">
            <div className="profile-image-wrapper">
              <AutoSlidingImages images={props.storeInformation.story.length ? story : defaultStory} />
            </div>

            <StoreOptions userInformation={props.userInformation} setOpenStatus={props.setOpenStatus} setOpenUpdate={props.setOpenUpdate} />

            <StoreHeader setOpenImage={props.setOpenImage} storeInformation={props.storeInformation} setStoreInformation={props.setStoreInformation} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} />
            <StorePacks
              setOpenPacks={props.setOpenPacks}
              storeInformation={props.storeInformation}
              setStoreInformation={props.setStoreInformation}
              userInformation={props.userInformation}
              setUserInformation={props.setUserInformation}
              refreshStatus={props.refreshStatus}
              setRefreshStatus={props.setRefreshStatus}
              toast={props.toast}
              storeChart={props.storeChart}
              packsChart={props.packsChart}
              packs={props.storeInformation.packs}
            />
            <Map width={"100%"} height={"500"} lat={props.storeInformation.information.latitude} long={props.storeInformation.information.longitude} />

            <StoreUsers users={props.storeUsers} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setUsers={props.setStoreUsers} usersPage={props.usersPage} setUsersPage={props.setUsersPage} />
          </div>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreLeft;
