import { FcCancel } from "react-icons/fc";
import checkPermissions from "../../../functions/checkPermission";
import { motion } from "framer-motion";

function CardsArea(props) {
  function openCardHandle() {
    if (!checkPermissions(props.userInformation, ["user.openBox"])) {
      props.toast.error("لقد تم حظرك عن فتح العروض اليومية", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else if (props.canOpen > -200) {
      props.setOpenOffer(true);
    } else {
      props.toast.info("لم يعد لديك عروض متاحة, يرجى المحاولة لاحقا", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }
  try {
    return (
      <>
        <section className="content-section">
          <h1 className="section-header">قم باختيار كارد عشوائي</h1>

          {Array.from(Array(3).keys()).map((item, index) => {
            return (
              <div key={index} className="card-section">
                {Array.from(Array(3).keys()).map((item, innerindex) => {
                  return (
                    <motion.div
                      key={innerindex}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", duration: "1.2" }}
                      className="offer-card"
                      style={{ cursor: "pointer", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
                      onClick={() => {
                        openCardHandle();
                      }}
                    >
                      <img src="images/test.png" />
                      {!checkPermissions(props.userInformation, ["user.openBox"]) ? (
                        <span style={{ margin: "10px", position: "absolute", top: "-2%", left: "-4%", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "150px", opacity: ".2", cursor: "not-allowed" }}>
                          <FcCancel />
                        </span>
                      ) : null}
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CardsArea;
