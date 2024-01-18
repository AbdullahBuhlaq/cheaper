import { userImag } from "../../../../constants/story";
import jsonParse from "../../../../functions/jsonParse";
import { motion } from "framer-motion";

function StoreUserItem(props) {
  try {
    return (
      <>
        <motion.tr initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ ease: "linear", duration: "0.5" }}>
          <td>
            <div className="table-wrapper-info">
              <img src={props.item["user.avatar"] ? jsonParse(props.item["user.avatar"])[0] : userImag} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
              <p>{props.item["user.name"]}</p>
            </div>
          </td>
          <td>{props.item.discount}%</td>
          <td>{new Date(props.item.createdAt).toLocaleDateString()}</td>
          <td>{props.item.dataTake ? new Date(props.item.dataTake).toLocaleDateString() : "لم يتم الاستلام"}</td>
        </motion.tr>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StoreUserItem;
