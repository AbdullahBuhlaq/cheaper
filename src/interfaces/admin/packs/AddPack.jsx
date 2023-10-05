import { useState } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import Button from "../../../components/Button";
import packSchema from "./schema/packSchema";
import addPack from "./functions/addPack";

function AddPack(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [pack, setPack] = useState({
    name: "",
    duration: 0,
    price: 0,
  });

  const [packErrors, setPackErrors] = useState({});

  const joiPack = Joi.object(packSchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"اسم الباقة"} type={"text"} name={"name"} onChange={handleSave} state={pack} setState={setPack} errors={packErrors} setErrors={setPackErrors} schema={packSchema} />
            <Input placeholder={""} label={"المدة"} type={"number"} name={"duration"} onChange={handleSave} state={pack} setState={setPack} errors={packErrors} setErrors={setPackErrors} schema={packSchema} />
            <Input placeholder={""} label={"السعر"} type={"number"} name={"price"} onChange={handleSave} state={pack} setState={setPack} errors={packErrors} setErrors={setPackErrors} schema={packSchema} />
          </div>
          <Button
            action={() => {
              addPack(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.packs, props.setPacks, pack, setDuringAdd, props.setAddNew);
            }}
            text={"إرسال"}
            disabled={duringAdd}
            joiObject={joiPack}
            state={pack}
            setStateErrors={setPackErrors}
            toast={props.toast}
          />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddPack;
