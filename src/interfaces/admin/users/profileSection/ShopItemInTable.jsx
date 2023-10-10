import checkPermissions from "../../../../functions/checkPermission";
import jsonParse from "../../../../functions/jsonParse";
import { motion } from "framer-motion";

function ShopItemInTable(props) {
  try {
    return (
      <>
        <motion.tr initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ ease: "linear", duration: "0.5" }}>
          <td>
            <div className="table-wrapper-info">
              <img src={props.offer.avatar ? jsonParse(props.offer.avatar)[1] : "../images/user.webp"} className="" />
              <p>{props.offer.nameStore}</p>
            </div>
          </td>
          <td>{props.offer.discount}%</td>
          <td>{new Date(props.offer.createdAt).toLocaleDateString()}</td>
          <td>{new Date(props.offer.dataTake).toLocaleDateString()}</td>
          <td>{props.offer.offerType}</td>
          {checkPermissions(props.userInformation, ["admin.users.block.informationStoreInfo"]) ? (
            <td>
              <a
                href="#"
                onClick={() => {
                  props.setOpenStore(props.offer.id);
                }}
              >
                عرض المزيد
              </a>
            </td>
          ) : null}
        </motion.tr>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ShopItemInTable;
