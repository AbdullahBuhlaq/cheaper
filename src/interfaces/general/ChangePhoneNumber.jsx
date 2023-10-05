import { useState } from "react";
import messages from "../../constants/messages";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import Button from "../../components/Button";
import requestOptions from "../../constants/requestOptions";
import changePhoneNumberSchema from "./schema/changePhoneNumber";
import changePhoneNumberFunc from "./functions/changePhoneNumberFunc";

function ChangePhoneNumber(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [changePhoneNumber, setChangePhoneNumber] = useState({
    password: "",
    phoneNumber: "",
  });

  const [changePhoneNumberErrors, setChangePhoneNumberErrors] = useState({});

  const joiChangePhoneNumber = Joi.object(changePhoneNumberSchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"كلمة السر"} type={"password"} name={"password"} onChange={handleSave} state={changePhoneNumber} setState={setChangePhoneNumber} errors={changePhoneNumberErrors} setErrors={setChangePhoneNumberErrors} schema={changePhoneNumberSchema} />
            <Input placeholder={""} label={"رقم الهاتف الجديد"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={changePhoneNumber} setState={setChangePhoneNumber} errors={changePhoneNumberErrors} setErrors={setChangePhoneNumberErrors} schema={changePhoneNumberSchema} />
          </div>
          <Button
            action={() => changePhoneNumberFunc(changePhoneNumber, setDuringAdd, props.setProfile, props.profile, props.toast, props.setEdit, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus)}
            text={"إرسال"}
            disabled={duringAdd}
            joiObject={joiChangePhoneNumber}
            state={changePhoneNumber}
            setStateErrors={setChangePhoneNumberErrors}
            toast={props.toast}
          />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ChangePhoneNumber;
