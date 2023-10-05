import DevicesCards from "./Rates";

function ProfileBody(props) {
  try {
    return (
      <>
        <section className="profile-right-section">
          <DevicesCards profile={props.profile} />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileBody;
