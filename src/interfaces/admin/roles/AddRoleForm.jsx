import { useState } from "react";
import Joi from "joi";
import handleSave from "../../../functions/handleSave";
import ShowItem from "../../../components/ShowItem";
import Input from "../../../components/Input";
import PermissionGroup from "./PermissionGroup";
import roleSchema from "./schema/roleSchema";
import addRole from "./functions/addRole";
import Button from "../../../components/Button";
import checkPermissions from "../../../functions/checkPermission";

function AddRoleForm(props) {
  const [index, setIndex] = useState(1);
  const [duringAdd, setDuringAdd] = useState(false);

  const [role, setRole] = useState({
    name: "",
    show: [],
    action: [],
  });

  const [roleErrors, setRoleErrors] = useState({});

  const joiRole = Joi.object(roleSchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={"اسم الدور الجديد"} label={"اسم الدور"} type={"text"} name={"name"} onChange={handleSave} state={role} setState={setRole} errors={roleErrors} setErrors={setRoleErrors} schema={roleSchema} />
          </div>
        </form>

        <div className="header upcoming">صلاحيات التعديل</div>
        {Object.keys(props.permission).map((permissionGroup, permissionGroupIndex) => {
          return <PermissionGroup key={permissionGroupIndex} id={-1} index={index} currentEdit={props.currentEdit} setIndex={setIndex} permission={props.permission} permissionGroup={permissionGroup} permissionGroupIndex={permissionGroupIndex} role={role} setRole={setRole} roleErrors={roleErrors} setRoleErrors={setRoleErrors} roleSchema={roleSchema} name={"action"} />;
        })}
        {roleErrors["action"] && <div className="validating-error">{roleErrors["action"]}</div>}

        <div className="header upcoming">صلاحيات القراءة</div>
        {props.show.map((showItem, showIndex) => {
          return <ShowItem key={showIndex} id={-1} index={showIndex} showItem={showItem} role={role} setRole={setRole} roleErrors={roleErrors} setRoleErrors={setRoleErrors} roleSchema={roleSchema} name={"show"} />;
        })}
        {roleErrors["show"] && <div className="validating-error">{roleErrors["show"]}</div>}

        {checkPermissions(props.userInformation, ["admin.role.create", "admin.role.all"]) ? (
          <form className="role-footer">
            <div className="button-container">
              <Button classes={"action-button filter jsFilter"} action={() => addRole(role, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAdd, props.setRoles, props.roles, props.setCurrentEdit, props.toast)} text={"إضافة"} disabled={duringAdd} joiObject={joiRole} state={role} setStateErrors={setRoleErrors} toast={props.toast} />
            </div>
          </form>
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddRoleForm;
