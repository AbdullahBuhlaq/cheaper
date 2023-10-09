import { useEffect, useState } from "react";
import Joi from "joi";
import ShowItem from "../../../components/ShowItem";
import PermissionGroup from "./PermissionGroup";
import roleSchema from "./schema/roleSchema";
import editRole from "./functions/editRole";
import Button from "../../../components/Button";
import checkPermissions from "../../../functions/checkPermission";

function RoleItem(props) {
  const [index, setIndex] = useState(1);
  const [duringAdd, setDuringAdd] = useState(false);

  const [role, setRole] = useState({
    name: props.currentEdit.name,
    show: props.currentEdit.show,
    action: props.currentEdit.action,
  });

  useEffect(() => {
    setRole({ name: props.currentEdit.name, show: props.currentEdit.show, action: props.currentEdit.action });
  }, [props.currentEdit]);

  const [roleErrors, setRoleErrors] = useState({});

  const joiRole = Joi.object(roleSchema);

  try {
    return (
      <>
        <div className="role-name">{props.currentEdit.name}</div>
        <div className="header">صلاحيات التعديل</div>
        {Object.keys(props.permission).map((permissionGroup, permissionGroupIndex) => {
          return <PermissionGroup key={permissionGroupIndex} index={index} currentEdit={props.currentEdit} setIndex={setIndex} permission={props.permission} permissionGroup={permissionGroup} permissionGroupIndex={permissionGroupIndex} role={role} setRole={setRole} roleErrors={roleErrors} setRoleErrors={setRoleErrors} roleSchema={roleSchema} name={"action"} />;
        })}
        {roleErrors["action"]}

        <div className="header upcoming">صلاحيات القراءة</div>
        {props.show.map((showItem, showIndex) => {
          return <ShowItem key={showIndex} disabled={props.currentEdit.id <= 5} id={props.currentEdit.id} index={showIndex} showItem={showItem} role={role} setRole={setRole} roleErrors={roleErrors} setRoleErrors={setRoleErrors} roleSchema={roleSchema} name={"show"} />;
        })}
        {roleErrors["show"]}
        {props.currentEdit.id > 5 ? (
          checkPermissions(props.userInformation, ["admin.role.update", "admin.role.delete", "admin.role.all"]) ? (
            <form className="role-footer">
              <div className="button-container">
                {checkPermissions(props.userInformation, ["admin.role.update", "admin.role.all"]) ? (
                  <Button classes={"action-button filter jsFilter"} action={() => editRole(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, role, setDuringAdd, props.setRoles, props.roles, props.currentEdit, props.toast)} text={"حفظ التعديل"} disabled={duringAdd} joiObject={joiRole} state={role} setStateErrors={setRoleErrors} toast={props.toast} />
                ) : null}
                {checkPermissions(props.userInformation, ["admin.role.delete", "admin.role.all"]) ? (
                  <Button
                    classes={"action-button filter jsFilter"}
                    action={(event) => {
                      event.preventDefault();
                      props.deleteRole(props.currentEdit.id);
                    }}
                    text={"حذف"}
                    disabled={duringAdd}
                    joiObject={joiRole}
                    state={role}
                    setStateErrors={setRoleErrors}
                    toast={props.toast}
                  />
                ) : null}
              </div>
            </form>
          ) : null
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default RoleItem;
