import { useEffect, useState } from "react";
import PermissionItem from "../../../components/PermissionItem";
import { motion } from "framer-motion";
import handleSave from "../../../functions/handleSave";

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

  async function selectAll() {
    let finalPermissions = [];
    await Promise.all(
      Object.keys(props.permission[props.permissionGroup]).map(async (permissionItem, permissionIndex) => {
        if (props.block[props.name].indexOf(props.permission[props.permissionGroup][permissionItem]) != -1) props.block[props.name].splice(props.block[props.name].indexOf(props.permission[props.permissionGroup][permissionItem]), 1);
        finalPermissions = [...finalPermissions, props.permission[props.permissionGroup][permissionItem]];
      })
    );
    await handleSave({ target: { name: props.name, value: [...props.block[props.name], ...finalPermissions] } }, props.block, props.setBlock, props.blockErrors, props.setBlockErrors, props.blockSchema);
  }

  async function deleteAll() {
    await Promise.all(
      Object.keys(props.permission[props.permissionGroup]).map(async (permissionItem, permissionIndex) => {
        if (props.block[props.name].indexOf(props.permission[props.permissionGroup][permissionItem]) != -1) props.block[props.name].splice(props.block[props.name].indexOf(props.permission[props.permissionGroup][permissionItem]), 1);
      })
    );
    await handleSave({ target: { name: props.name, value: [...props.block[props.name]] } }, props.block, props.setBlock, props.blockErrors, props.setBlockErrors, props.blockSchema);
  }

  const [isSelect, setIsSelect] = useState(true);

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
          {opened ? (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "max-content", originY: "-30%", opacity: 1 }} exit={{ scaleY: 0, originY: "-30%", opacity: 0 }} transition={{ duration: 0.05 * elements.length }} style={{ overflow: "hidden" }}>
              {props.currentEdit?.id == 1 ? null : isSelect ? (
                <button
                  onClick={() => {
                    selectAll();
                    setIsSelect(false);
                  }}
                >
                  تحديد الكل
                </button>
              ) : (
                <button
                  onClick={() => {
                    deleteAll();
                    setIsSelect(true);
                  }}
                >
                  إلغاء تحديد الكل
                </button>
              )}
              {elements}
            </motion.div>
          ) : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PermissionGroup;
