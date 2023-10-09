import { useState } from "react";
import Joi from "joi";
import handleSave from "../../../functions/handleSave";
import ShowItem from "../../../components/ShowItem";
import Input from "../../../components/Input";
import PermissionGroup from "./PermissionGroup";
import Button from "../../../components/Button";
import addBlock from "./functions/addBlock";
import blockSchema from "./schema/blockSchema";
import checkPermissions from "../../../functions/checkPermission";

function AddBlockForm(props) {
  const [index, setIndex] = useState(1);
  const [duringAdd, setDuringAdd] = useState(false);

  const [block, setBlock] = useState({
    reason: "",
    duration: 0,
    show: [],
    action: [],
  });

  const [blockErrors, setBlockErrors] = useState({});

  const joiBlock = Joi.object(blockSchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={"سبب الحظر الجديد"} label={"سبب الحظر"} type={"text"} name={"reason"} onChange={handleSave} state={block} setState={setBlock} errors={blockErrors} setErrors={setBlockErrors} schema={blockSchema} />
            <Input placeholder={"كم يوما سيستمر الحظر؟"} label={"المدة"} type={"number"} name={"duration"} onChange={handleSave} state={block} setState={setBlock} errors={blockErrors} setErrors={setBlockErrors} schema={blockSchema} />
          </div>
        </form>

        <div className="header upcoming">صلاحيات التعديل</div>
        {Object.keys(props.permission).map((permissionGroup, permissionGroupIndex) => {
          return <PermissionGroup key={permissionGroupIndex} id={-1} index={index} currentEdit={props.currentEdit} setIndex={setIndex} permission={props.permission} permissionGroup={permissionGroup} permissionGroupIndex={permissionGroupIndex} block={block} setBlock={setBlock} blockErrors={blockErrors} setBlockErrors={setBlockErrors} blockSchema={blockSchema} name={"action"} />;
        })}
        {blockErrors["action"] && <div className="validating-error">{blockErrors["action"]}</div>}

        <div className="header upcoming">صلاحيات القراءة</div>
        {props.show.map((showItem, showIndex) => {
          return <ShowItem key={showIndex} id={-1} index={showIndex} showItem={showItem} role={block} setRole={setBlock} roleErrors={blockErrors} setRoleErrors={setBlockErrors} roleSchema={blockSchema} name={"show"} />;
        })}
        {blockErrors["show"] && <div className="validating-error">{blockErrors["show"]}</div>}
        {checkPermissions(props.userInformation, ["admin.block.create", "admin.block.all"]) ? (
          <form className="role-footer">
            <div className="button-container">
              <Button classes={"action-button filter jsFilter"} action={() => addBlock(block, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAdd, props.blocks, props.setBlocks, props.setCurrentEdit, props.toast)} text={"إرسال"} disabled={duringAdd} joiObject={joiBlock} state={block} setStateErrors={setBlockErrors} toast={props.toast} />
            </div>
          </form>
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddBlockForm;
