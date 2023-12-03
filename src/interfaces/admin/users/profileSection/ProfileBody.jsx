import DevicesCards from "./DevicesCards";
import OffersStatistics from "./OffersStatistics";
import { FaCircleXmark } from "react-icons/fa6";

function ProfileBody(props) {
  try {
    return (
      <>
        <section className="new-right-area profile-right-section">
          <div
            className={"btn-close-right"}
            onClick={() => {
              document.getElementsByClassName("new-right-area")[0].classList.remove("show");
            }}
          >
            <FaCircleXmark />
          </div>
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
