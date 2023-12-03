import DevicesCards from "./Rates";

function ProfileBody(props) {
  try {
    return (
      <>
        <section className="new-right-area profile-right-section">
          <DevicesCards profile={props.profile} logoutDevice={props.logoutDevice} />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileBody;
