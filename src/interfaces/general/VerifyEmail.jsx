import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import verifyEmail from "./functions/verifyEmail";
import { motion } from "framer-motion";
import { FcOk } from "react-icons/fc";
import { FaCircleXmark } from "react-icons/fa6";

function VerifyEmail(props) {
  const [queryParameters] = useSearchParams();
  const [status, setStatus] = useState("during");
  const [edit, setEdit] = useState(true);
  useEffect(() => {
    verifyEmail(setEdit, props.profile, props.setProfile, setStatus, queryParameters.get("code"), props.toast, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus);
  }, []);

  try {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: "100px" }}>
            {status == "during" ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ width: "100px", height: "100px", borderRadius: "50%", border: "10px solid #777", borderTopColor: "transparent", marginBottom: "20px" }}></motion.div>
            ) : status == "done" ? (
              <FcOk />
            ) : (
              <span style={{ color: "tomato" }}>
                <FaCircleXmark />
              </span>
            )}
          </span>
          <span>{status == "during" ? "يتم التحقق ..." : status == "done" ? "تم تأكيد البريد" : status}</span>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default VerifyEmail;
