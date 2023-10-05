import { useState, useEffect } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import editConfig from "./functions/editConfig";
import Button from "../../../components/Button";
import { configSchema } from "./schema/configSchema";

function UpdateConfigs(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [config, setConfig] = useState({
    discountFreeAtLeast: props.currentEdit.discountFreeAtLeast,
    discountFreeAtMost: props.currentEdit.discountFreeAtMost,
    discountPaidATleast: props.currentEdit.discountPaidATleast,
    discountPaidAtMost: props.currentEdit.discountPaidAtMost,
    GiftCard: props.currentEdit.GiftCard,
    GiftPack: props.currentEdit.GiftPack,
    spam: props.currentEdit.spam,
    GiftOfferMore: props.currentEdit.GiftOfferMore,
  });

  useEffect(() => {
    setConfig({
      discountFreeAtLeast: props.currentEdit.discountFreeAtLeast,
      discountFreeAtMost: props.currentEdit.discountFreeAtMost,
      discountPaidATleast: props.currentEdit.discountPaidATleast,
      discountPaidAtMost: props.currentEdit.discountPaidAtMost,
      GiftCard: props.currentEdit.GiftCard,
      GiftPack: props.currentEdit.GiftPack,
      spam: props.currentEdit.spam,
      GiftOfferMore: props.currentEdit.GiftOfferMore,
    });
  }, [props.currentEdit]);

  const [configErrors, setConfigErrors] = useState({});

  const joiConfig = Joi.object(configSchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"أقل خصم مجاني"} type={"number"} name={"discountFreeAtLeast"} onChange={handleSave} state={config} setState={setConfig} errors={configErrors} setErrors={setConfigErrors} schema={configSchema} />
            <Input placeholder={""} label={"أكثر خصم مجاني"} type={"number"} name={"discountFreeAtMost"} onChange={handleSave} state={config} setState={setConfig} errors={configErrors} setErrors={setConfigErrors} schema={configSchema} />
            <Input placeholder={""} label={"أقل خصم مدفوع"} type={"number"} name={"discountPaidATleast"} onChange={handleSave} state={config} setState={setConfig} errors={configErrors} setErrors={setConfigErrors} schema={configSchema} />
            <Input placeholder={""} label={"أكثر خصم مدفوع"} type={"number"} name={"discountPaidAtMost"} onChange={handleSave} state={config} setState={setConfig} errors={configErrors} setErrors={setConfigErrors} schema={configSchema} />
            <Input placeholder={""} label={"بطاقة هدية"} type={"number"} name={"GiftCard"} onChange={handleSave} state={config} setState={setConfig} errors={configErrors} setErrors={setConfigErrors} schema={configSchema} />
            <Input placeholder={""} label={"صندوق هدايا"} type={"number"} name={"GiftPack"} onChange={handleSave} state={config} setState={setConfig} errors={configErrors} setErrors={setConfigErrors} schema={configSchema} />
            <Input placeholder={""} label={"رسائل البريد المزعج"} type={"number"} name={"spam"} onChange={handleSave} state={config} setState={setConfig} errors={configErrors} setErrors={setConfigErrors} schema={configSchema} />
            <Input placeholder={""} label={"عرض هدية إضافي"} type={"number"} name={"GiftOfferMore"} onChange={handleSave} state={config} setState={setConfig} errors={configErrors} setErrors={setConfigErrors} schema={configSchema} />
          </div>
          <Button action={() => editConfig(config, setDuringAdd, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setConfigs, props.setCurrentEdit, props.configs)} text={"حفظ"} disabled={duringAdd} joiObject={joiConfig} state={config} setStateErrors={setConfigErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdateConfigs;
