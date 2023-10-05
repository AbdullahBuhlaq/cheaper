import DevicesCards from "./DevicesCards";
import OffersStatistics from "./OffersStatistics";

function ProfileBody(props) {
  try {
    return (
      <>
        <section className="profile-right-section">
          <DevicesCards userProfile={props.userProfile} />

          <OffersStatistics userProfile={props.userProfile} />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileBody;
