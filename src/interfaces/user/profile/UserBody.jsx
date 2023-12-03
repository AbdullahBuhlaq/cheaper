import UserDevicesCards from "./UserDevicesCard";

function UserBody(props) {
  try {
    return (
      <>
        <section className="new-right-area profile-right-section">
          <UserDevicesCards profile={props.profile} logoutDevice={props.logoutDevice} />

          {/* <OffersStatistics userProfile={props.userProfile} /> */}
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserBody;
