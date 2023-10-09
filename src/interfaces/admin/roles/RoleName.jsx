import { motion } from "framer-motion";

function RoleName(props) {
  try {
    return (
      <>
        <motion.div
          className="role-card"
          onClick={() => {
            props.setCurrentEdit(props.role);
            props.setAddNew(false);
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: "1.2", delay: props.index * 0.1 }}
        >
          <div className="role-card-content">
            <div className="role-card-info-wrapper">
              <div className="role-card-info">
                <i className="fa-duotone fa-apartment"></i>
                <div className="role-card-info-title">
                  <h3>{props.role.name}</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default RoleName;
