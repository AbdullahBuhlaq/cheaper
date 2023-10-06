import RoleItem from "./RoleItem";
import AddRoleForm from "./AddRoleForm";
import { useEffect, useRef, useState } from "react";
import { adminPermission, shopkeeperPermission, userPermission } from "../../../constants/permissions";
import selectOptions from "../../../constants/selectOptions";
import Loading from "../../general/Loading";
import RoleName from "./RoleName";
import "./css/roles.css";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import RoleHeader from "./RoleHeader";
import getRoles from "./functions/getRoles";
import deleteRoleFunc from "./functions/deleteRoleFunc";
import HeaderButton from "../../../components/mainArea";
import jsonParse from "../../../functions/jsonParse";

function Roles(props) {
  const cardRef = useRef();
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [filter, setFilter] = useState(searchOptions.roles);

  useEffect(() => {
    if (!currentEdit) setAddNew(true);
  }, [currentEdit]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.roles).map(async (role, roleIndex) => {
            const isTrue = await compare(filter, { name: props.roles[role].name });
            if (isTrue) {
              return <RoleName key={roleIndex} role={props.roles[role]} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} setAddNew={setAddNew} />;
            }
          })
        );
        setItems([...newArr]);
      };

      populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [filter, props.roles, currentEdit]);

  useEffect(() => {
    setCurrentEdit(false);
  }, [filter]);

  async function deleteRole(id) {
    deleteRoleFunc(id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.roles, props.employees, props.setEmployees, props.setRoles, setCurrentEdit, props.toast);
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.roles == -1) getRoles(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setRoles);
  }, []);
  useEffect(() => {
    if (props.roles != -1) setLoading(false);
  }, [props.roles]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      for (const card of cardRef.current.getElementsByClassName("role-card")) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    if (cardRef.current) {
      cardRef.current.onmousemove = handleMouseMove;
    }
  }, [cardRef.current]);

  try {
    return (
      <>
        {loading ? (
          <div className="profile-main-area">
            <Loading />
          </div>
        ) : (
          <>
            <div className="main-area" style={{ flex: "initial" }}>
              <HeaderButton />

              <div className="role-right-area">
                <div id="role-cards" ref={cardRef}>
                  <div
                    className="role-card"
                    style={{ "--mouse-x": " 243.38641357421875px", "--mouse-y": "32px" }}
                    onClick={() => {
                      setCurrentEdit(false);
                      setAddNew(true);
                    }}
                  >
                    <div className="role-card-content">
                      <div className="role-card-info-wrapper">
                        <div className="role-card-info">
                          <i className="fa-duotone fa-apartment"></i>
                          <div className="role-card-info-title">
                            <h3>دور جديد</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {items.map((item) => {
                    return item;
                  })}
                </div>
              </div>
            </div>

            <div className="tasks-wrapper">
              <RoleHeader filter={filter} setFilter={setFilter} />
              {currentEdit && (
                <RoleItem
                  toast={props.toast}
                  currentEdit={jsonParse(currentEdit)}
                  deleteRole={deleteRole}
                  roles={props.roles}
                  setRoles={props.setRoles}
                  permission={currentEdit.action[0][0] == "a" ? adminPermission : currentEdit.action[0][0] == "u" ? userPermission : shopkeeperPermission}
                  show={currentEdit.action[0][0] == "a" ? selectOptions.adminShow : currentEdit.action[0][0] == "u" ? selectOptions.userShow : selectOptions.shopkeeperShow}
                  userInformation={props.userInformation}
                  setUserInformation={props.setUserInformation}
                  refreshStatus={props.refreshStatus}
                  setRefreshStatus={props.setRefreshStatus}
                />
              )}
              {addNew && <AddRoleForm toast={props.toast} roles={props.roles} setRoles={props.setRoles} permission={adminPermission} show={selectOptions.adminShow} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} />}
            </div>
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Roles;
