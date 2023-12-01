import { useEffect, useState } from "react";
import ProfileOptions from "./ProfileOptions";
import ProfileInfoHeader from "./ProfileInfoHeader";
import ProfileCardsContainer from "./ProfileCardsContainer";
import ProfileTable from "./ProfileTable";
import ProfilePacks from "./ProfilePacks";
import AutoSlidingImages from "../users/profileSection/AutoSlider";
import { defaultSecondStory } from "../../../constants/story";
import jsonParse from "../../../functions/jsonParse";
import checkPermissions from "../../../functions/checkPermission";
import Map from "../../../components/Map";

function StoreProfileLeft(props) {
  const [story, setStory] = useState([]);
  async function getStory() {
    let newStory = [];

    await Promise.all(
      props.store.storeInfo.story.map((item) => {
        newStory = [...newStory, jsonParse(item.avatar)[3]];
      })
    );

    setStory(newStory);
  }
  useEffect(() => {
    if (props.store != -1) getStory();
  }, [props.store]);
  try {
    return (
      <>
        <div className="profile-left">
          <div className="profile-image-wrapper">
            <AutoSlidingImages images={props.store.storeInfo.story.length ? story : defaultSecondStory} />
          </div>

          <ProfileOptions userInformation={props.userInformation} setOpenBlocks={props.setOpenBlocks} name={props.store.storeInfo["nameStore"]} deletedAt={props.store.storeInfo.deletedAt} />
          <ProfileInfoHeader store={props.store} />
          <ProfileCardsContainer store={props.store} />
          <ProfilePacks packsChart={props.packsChart} userInformation={props.userInformation} storeChart={props.storeChart} packs={props.packs} />
          <Map width={"100%"} height={"500"} lat={props.store.storeInfo.latitude} long={props.store.storeInfo.longitude} />
          {checkPermissions(props.userInformation, ["admin.store.accepted.evaluationAndSpam"]) && props.users != -1 ? (
            <ProfileTable users={props.users} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setUsers={props.setUsers} usersPage={props.usersPage} setUsersPage={props.setUsersPage} id={props.id} />
          ) : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreProfileLeft;
