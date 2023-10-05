import UserDevicesCards from "./UserDevicesCard";

function UserBody(props) {
  try {
    return (
      <>
        <section className="profile-right-section">
          <UserDevicesCards profile={props.profile} />

          {/* <OffersStatistics userProfile={props.userProfile} /> */}
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserBody;
