import { useEffect, useState } from "react";
import PermissionItem from "../../../components/PermissionItem";

function PermissionGroup(props) {
  const [opened, setOpened] = useState(false);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    try {
      setElements(
        Object.keys(props.permission[props.permissionGroup]).map((permissionItem, permissionIndex) => {
          props.setIndex(props.index + 1);
          return (
            <PermissionItem
              disabled={props.currentEdit?.id == 1}
              key={permissionIndex}
              id={props.id ? props.id : props.currentEdit?.id}
              index={props.index}
              permissionGroupIndex={props.permissionGroupIndex}
              permissionItem={permissionItem}
              permissionGroup={props.permissionGroup}
              permission={props.permission}
              role={props.block}
              setRole={props.setBlock}
              roleErrors={props.blockErrors}
              setRoleErrors={props.setBlockErrors}
              roleSchema={props.blockSchema}
              name={props.name}
            />
          );
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [props.block]);
  try {
    return (
      <>
        <div className="panel panel-default">
          <div className="panel-heading" role="tab" id="headingOne" onClick={() => setOpened(!opened)}>
            <h4 className="panel-title">
              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded={opened ? "true" : "false"} aria-controls="collapseOne">
                {props.permissionGroup}
              </a>
            </h4>
          </div>
          {opened ? elements : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PermissionGroup;
