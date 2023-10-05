import { useState } from "react";
import messages from "../../constants/messages";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import Button from "../../components/Button";
import changeEmailSchema from "./schema/changeEmailSchema";
import changeEmailFunc from "./functions/changeEmail";

function ChangeEmail(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [changeEmail, setEmail] = useState({
    password: "",
    newEmail: "",
  });

  const [changeEmailErrors, setEmailErrors] = useState({});

  const joiEmail = Joi.object(changeEmailSchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"كلمة السر"} type={"password"} name={"password"} onChange={handleSave} state={changeEmail} setState={setEmail} errors={changeEmailErrors} setErrors={setEmailErrors} schema={changeEmailSchema} />
            <Input placeholder={""} label={"الإيميل الجديد"} type={"email"} name={"newEmail"} onChange={handleSave} state={changeEmail} setState={setEmail} errors={changeEmailErrors} setErrors={setEmailErrors} schema={changeEmailSchema} />
          </div>
          <Button action={() => changeEmailFunc(changeEmail, setDuringAdd, props.setProfile, props.setEdit, props.toast, props.profile, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus)} text={"إرسال"} disabled={duringAdd} joiObject={joiEmail} state={changeEmail} setStateErrors={setEmailErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ChangeEmail;
