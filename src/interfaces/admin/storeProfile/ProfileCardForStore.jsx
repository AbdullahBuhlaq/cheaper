import { motion } from "framer-motion";

function ProfileCardForStore(props) {
  try {
    return (
      <>
        <motion.div className="details-profile-card" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2" }}>
          <div className="details-profile-card-header">
            <h1>{props.title}</h1>
          </div>

          <div className="details-profile-card-body">
            <div className="details-profile-card-body-icon">
              <i className="material-icons">{props.icon}</i>
            </div>
            <input type="text" value={props.value} readOnly />
          </div>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileCardForStore;
