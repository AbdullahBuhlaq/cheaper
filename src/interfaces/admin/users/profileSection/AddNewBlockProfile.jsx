import { useState } from "react";
import Joi from "joi";
import SelectFromDB from "../../../../components/SelectFromDB";
import Button from "../../../../components/Button";
import handleSave from "../../../../functions/handleSave";
import newBlockSchema from "../schema/newBlockSchema";
import addNewBlock2 from "./function/addNewBlock";

function AddNewBlockProfile(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [newBlock, setNewBlock] = useState({
    blockId: null,
  });

  const [newBlockErrors, setNewBlockErrors] = useState({});

  const joiNewBlock = Joi.object(newBlockSchema);

  try {
    return (
      <>
        <div className="categories-main-modal-body-add-blocks">
          <SelectFromDB label={"إضافة حظر جديد للمستخدم"} placeholder={"اختر نوع حظر..."} list={props.blocks} type={"less1"} showKey={"reason"} valueKey={"id"} name={"blockId"} onChange={handleSave} state={newBlock} setState={setNewBlock} errors={newBlockErrors} setErrors={setNewBlockErrors} schema={newBlockSchema} />
          <div className="categories-main-modal-body-add-blocks-action-botton">
            <Button action={() => addNewBlock2(props.blocks, props.userBlocks, props.setUserBlocks, newBlock, props.currentShowBlocks, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAdd, props.toast)} text={"إرسال"} disabled={duringAdd} joiObject={joiNewBlock} state={newBlock} setStateErrors={setNewBlockErrors} toast={props.toast} />
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddNewBlockProfile;
