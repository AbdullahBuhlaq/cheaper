import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import verifyEmail from "./functions/verifyEmail";

function VerifyEmail(props) {
  const [queryParameters] = useSearchParams();
  const [status, setStatus] = useState("during");
  const [edit, setEdit] = useState(true);
  useEffect(() => {
    verifyEmail(setEdit, props.profile, props.setProfile, setStatus, queryParameters.get("code"), props.toast, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus);
  }, []);

  try {
    return <>{status == "during" ? "sent..." : status == "done" ? "done" : status}</>;
  } catch (err) {
    console.log(err);
  }
}

export default VerifyEmail;
