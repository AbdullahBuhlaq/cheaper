import { useState } from "react";
import sendCodeSchema from "./schema/sendCode";
import handleSave from "../../functions/handleSave";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Joi from "joi";
import resendCode from "./functions/resendCode";
import verifyEmail from "./functions/verifyEmail";

function SendCode(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [sendCode, setSendCode] = useState({
    code: "",
  });

  const [status, setStatus] = useState("pre");

  const [sendCodeErrors, setSendCodeErrors] = useState({});

  const joiEmail = Joi.object(sendCodeSchema);

  function sendCodeFunc() {
    verifyEmail(props.setEdit, props.profile, props.setProfile, setStatus, sendCode.code, props.toast, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus);
  }

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"أدخل الكود المرسل"} type={"text"} name={"code"} onChange={handleSave} state={sendCode} setState={setSendCode} errors={sendCodeErrors} setErrors={setSendCodeErrors} schema={sendCodeSchema} />
            <span style={{ marginRight: "15px", cursor: "pointer" }} onClick={() => resendCode(props.profile, props.toast, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus)}>
              إعادة إرسال رمز التأكيد؟
            </span>
          </div>

          <Button action={() => sendCodeFunc()} text={"إرسال"} disabled={duringAdd} joiObject={joiEmail} state={sendCode} setStateErrors={setSendCodeErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SendCode;
