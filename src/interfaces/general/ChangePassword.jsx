import { useState } from "react";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import Button from "../../components/Button";
import changePasswordSchema from "./schema/changePasswordSchema";
import changePasswordFunc from "./functions/changePasswordFunc";

function ChangePassword(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [changePassword, setChangePassword] = useState({
    password: "",
    newPassword: "",
  });

  const [changePasswordErrors, setChangePasswordErrors] = useState({});

  const joiChangePassword = Joi.object(changePasswordSchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"كلمة السر"} type={"password"} name={"password"} onChange={handleSave} state={changePassword} setState={setChangePassword} errors={changePasswordErrors} setErrors={setChangePasswordErrors} schema={changePasswordSchema} />
            <Input placeholder={""} label={"كلمة السر الجديدة"} type={"password"} name={"newPassword"} onChange={handleSave} state={changePassword} setState={setChangePassword} errors={changePasswordErrors} setErrors={setChangePasswordErrors} schema={changePasswordSchema} />
          </div>
          <Button action={() => changePasswordFunc(changePassword, setDuringAdd, props.setProfile, props.profile, props.setEdit, props.toast, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus)} text={"إرسال"} disabled={duringAdd} joiObject={joiChangePassword} state={changePassword} setStateErrors={setChangePasswordErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ChangePassword;
