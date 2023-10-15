import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import EmployeeItem from "./EmployeeItem";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import Popup from "../../general/Popup";
import EmployeesHeader from "./EmployeesHeader";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import getEmployees from "./functions/getEmployees";
import getRoles from "../roles/functions/getRoles";
import deleteEmployeeFunc from "./functions/deleteEmployee";
import NotAllowdPage from "../../general/NotAllowedPage";
import checkPermissions from "../../../functions/checkPermission";

function Employees(props) {
  const [loading, setLoading] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [filter, setFilter] = useState(searchOptions.employees);

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.employees).map(async (employeeId, employeeIndex) => {
            const isTrue = await compare(filter, { name: props.employees[employeeId].name, phoneNumber: props.employees[employeeId].phoneNumber, username: props.employees[employeeId].username, gender: props.employees[employeeId].gender, email: props.employees[employeeId].email, roleId: props.employees[employeeId].roleId });
            if (isTrue) {
              return (
                <EmployeeItem
                  key={employeeIndex}
                  employee={props.employees[employeeId]}
                  roles={props.roles}
                  deleteEmployee={deleteEmployee}
                  setCurrentEdit={setCurrentEdit}
                  setAddNew={setAddNew}
                  userInformation={props.userInformation}
                  setUserInformation={props.setUserInformation}
                  refreshStatus={props.refreshStatus}
                  setRefreshStatus={props.setRefreshStatus}
                  toast={props.toast}
                  navigate={props.navigate}
                />
              );
            }
          })
        );
        setItems([...newArr]);
      };

      if (!loading) populateArray();
    } catch (err) {
      console.log(err);
    }
  }, [props.employees, currentEdit, props.roles, loading, filter]);

  useEffect(() => {
    if (props.employees == -1 && checkPermissions(props.userInformation, ["admin.employee.all"])) getEmployees(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setEmployees);
    if (props.roles == -1 && checkPermissions(props.userInformation, ["admin.role.all"])) getRoles(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, props.setRoles);
  }, []);
  useEffect(() => {
    if (props.employees != -1) setLoading(false);
  }, [props.employees]);

  async function deleteEmployee(id) {
    deleteEmployeeFunc(id, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.employees, props.setEmployees, props.toast);
  }

  try {
    return checkPermissions(props.userInformation, ["admin.employee.all"]) ? (
      <>
        {loading ? (
          <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Loading />
          </div>
        ) : (
          <>
            <div className="users-main-area">
              <div className="app-content">
                <EmployeesHeader userInformation={props.userInformation} setAddNew={setAddNew} filter={filter} setFilter={setFilter} roles={props.roles} />

                <div className="products-area-wrapper tableView" style={{ paddingBottom: "70px" }}>
                  <div className="products-header">
                    <div className="product-cell image">الاسم</div>
                    <div className="product-cell category">اسم المستخدم</div>
                    <div className="product-cell price">الهاتف</div>
                    <div className="product-cell sales">الجنس</div>
                    <div className="product-cell stock">البريد الإلكتروني</div>
                    {props.roles != -1 ? <div className="product-cell status-cell">الدور</div> : null}
                    <div className="product-cell option">خيارات</div>
                  </div>

                  {items.map((item) => {
                    return item;
                  })}
                </div>

                {addNew ? (
                  <>
                    <Popup
                      setOpen={setAddNew}
                      classes={"form-popup"}
                      component={<AddEmployee employees={props.employees} setEmployees={props.setEmployees} roles={props.roles} setAddNew={setAddNew} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} navigate={props.navigate} toast={props.toast} />}
                    />
                  </>
                ) : null}
                {currentEdit ? (
                  <>
                    <Popup
                      setOpen={setCurrentEdit}
                      classes={"form-popup"}
                      component={
                        <UpdateEmployee
                          employees={props.employees}
                          setEmployees={props.setEmployees}
                          roles={props.roles}
                          currentEdit={props.employees[currentEdit]}
                          setCurrentEdit={setCurrentEdit}
                          userInformation={props.userInformation}
                          setUserInformation={props.setUserInformation}
                          refreshStatus={props.refreshStatus}
                          setRefreshStatus={props.setRefreshStatus}
                          navigate={props.navigate}
                          toast={props.toast}
                        />
                      }
                    />
                  </>
                ) : null}
              </div>
            </div>
          </>
        )}
      </>
    ) : (
      <>
        <NotAllowdPage />
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Employees;
