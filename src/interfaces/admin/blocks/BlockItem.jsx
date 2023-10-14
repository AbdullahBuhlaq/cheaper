import { useEffect, useState } from "react";
import Joi from "joi";
import ShowItem from "../../../components/ShowItem";
import PermissionGroup from "./PermissionGroup";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import editBlock from "./functions/editBlock";
import deleteBlock from "./functions/deleteBlock";
import Button from "../../../components/Button";
import blockSchema from "./schema/blockSchema";
import checkPermissions from "../../../functions/checkPermission";

function BlockItem(props) {
  const [index, setIndex] = useState(1);
  const [duringAdd, setDuringAdd] = useState(false);

  const [block, setBlock] = useState({
    reason: props.currentEdit.reason,
    duration: props.currentEdit.duration,
    show: props.currentEdit.restrictions.show,
    action: props.currentEdit.restrictions.action,
  });
  useEffect(() => {
    setBlock({ reason: props.currentEdit.reason, duration: props.currentEdit.duration, show: props.currentEdit.restrictions.show, action: props.currentEdit.restrictions.action });
  }, [props.currentEdit]);

  const [blockErrors, setBlockErrors] = useState({});

  const joiBlock = Joi.object(blockSchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={"سبب الحظر الجديد"} label={"سبب الحظر"} type={"text"} name={"reason"} onChange={handleSave} state={block} setState={setBlock} errors={blockErrors} setErrors={setBlockErrors} schema={blockSchema} disabled={props.currentEdit.id == 1} />
            <Input placeholder={"كم يوما سيستمر الحظر؟"} label={"المدة"} type={"number"} name={"duration"} onChange={handleSave} state={block} setState={setBlock} errors={blockErrors} setErrors={setBlockErrors} schema={blockSchema} disabled={props.currentEdit.id == 1} />
          </div>
        </form>

        <div className="header">حظورات التعديل</div>
        {Object.keys(props.permission).map((permissionGroup, permissionGroupIndex) => {
          return <PermissionGroup key={permissionGroupIndex} index={index} currentEdit={props.currentEdit} setIndex={setIndex} permission={props.permission} permissionGroup={permissionGroup} permissionGroupIndex={permissionGroupIndex} block={block} setBlock={setBlock} blockErrors={blockErrors} setBlockErrors={setBlockErrors} blockSchema={blockSchema} name={"action"} />;
        })}
        {blockErrors["action"]}

        <div className="header upcoming">حظورات القراءة</div>
        {console.log(props.currentEdit)}
        {props.show.map((showItem, showIndex) => {
          return <ShowItem key={showIndex} disabled={props.currentEdit.id == 1} id={props.currentEdit.id} index={showIndex} showItem={showItem} role={block} setRole={setBlock} roleErrors={blockErrors} setRoleErrors={setBlockErrors} roleSchema={blockSchema} name={"show"} />;
        })}
        {blockErrors["show"]}
        {props.currentEdit.id == 1 ? null : checkPermissions(props.userInformation, ["admin.block.update", "admin.block.delete", "admin.block.all"]) ? (
          <form className="role-footer">
            <div className="button-container">
              {checkPermissions(props.userInformation, ["admin.block.update", "admin.block.all"]) ? (
                <Button classes={"action-button filter jsFilter"} action={() => editBlock(block, props.currentEdit, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAdd, props.blocks, props.setBlocks, props.toast)} text={"حفظ"} disabled={duringAdd} joiObject={joiBlock} state={block} setStateErrors={setBlockErrors} toast={props.toast} />
              ) : null}
              {checkPermissions(props.userInformation, ["admin.block.delete", "admin.block.all"]) ? (
                <Button
                  classes={"action-button filter jsFilter"}
                  action={(event) => {
                    event.preventDefault();
                    deleteBlock(props.currentEdit.id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.blocks, props.setBlocks, props.setCurrentEdit, props.toast);
                  }}
                  text={"حذف"}
                  disabled={duringAdd}
                  joiObject={joiBlock}
                  state={block}
                  setStateErrors={setBlockErrors}
                  toast={props.toast}
                  dontValid={true}
                />
              ) : null}
            </div>
          </form>
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BlockItem;
