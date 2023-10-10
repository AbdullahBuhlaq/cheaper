import { motion } from "framer-motion";

function StatisticsItem(props) {
  try {
    return (
      <>
        <motion.div className="access-link-wrapper" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: "1.2" }}>
          <div className="access-icon">
            <p>{props.value}</p>
          </div>
          <span className="access-text">{props.title}</span>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StatisticsItem;
