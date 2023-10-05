import { useState } from "react";
import ProfileOptions from "./ProfileOptions";
import ProfileInfoHeader from "./ProfileInfoHeader";
import ProfileCardsContainer from "./ProfileCardsContainer";
import ProfileTable from "./ProfileTable";
import ProfilePacks from "./ProfilePacks";
import AutoSlidingImages from "../users/profileSection/AutoSlider";
import { defaultSecondStory } from "../../../constants/story";

function StoreProfileLeft(props) {
  try {
    return (
      <>
        <div className="profile-left">
          <div className="profile-image-wrapper">
            <AutoSlidingImages images={props.store.storeInfo.story.length ? props.store.storeInfo.story : defaultSecondStory} />
          </div>

          <ProfileOptions setOpenBlocks={props.setOpenBlocks} name={props.store.storeInfo["nameStore"]} />
          <ProfileInfoHeader store={props.store} />
          <ProfileCardsContainer store={props.store} />
          <ProfileTable users={props.users} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} setUsers={props.setUsers} usersPage={props.usersPage} setUsersPage={props.setUsersPage} id={props.id} />
          <ProfilePacks packsChart={props.packsChart} storeChart={props.storeChart} packs={props.packs} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreProfileLeft;
