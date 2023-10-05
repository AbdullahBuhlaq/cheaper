import { useState, useEffect } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import packSchema from "./schema/packSchema";
import editPack from "./functions/editPack";
import Button from "../../../components/Button";

function UpdatePack(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [pack, setPack] = useState({
    name: props.currentEdit.name,
    duration: props.currentEdit.duration,
    price: props.currentEdit.price,
  });

  useEffect(() => {
    setPack({
      name: props.currentEdit.name,
      duration: props.currentEdit.duration,
      price: props.currentEdit.price,
    });
  }, [props.currentEdit]);
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

          <Button action={() => editPack(pack, props.currentEdit, setDuringAdd, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setPacks, props.setCurrentEdit, props.packs)} text={"حفظ"} disabled={duringAdd} joiObject={joiPack} state={pack} setStateErrors={setPackErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdatePack;
