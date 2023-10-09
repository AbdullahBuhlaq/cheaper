import { useState } from "react";
import searchOptions from "../../../constants/searchOptions";
import EmployeesFilter from "./EmployeesFilter";
import checkPermissions from "../../../functions/checkPermission";

function EmployeesHeader(props) {
  const [tempFilter, setTempFilter] = useState(searchOptions.employees);
  const [openFilter, setOpenFilter] = useState(false);

  try {
    return (
      <>
        <div className="app-content-actions">
          <input
            className="search-bar"
            placeholder="بحث..."
            type="text"
            value={props.filter.name.value ? props.filter.name.value : ""}
            onChange={(event) => {
              props.setFilter({ ...props.filter, name: { ...props.filter.name, value: event.target.value } });
              setTempFilter({ ...tempFilter, name: { ...props.filter.name, value: event.target.value } });
            }}
          />

          {checkPermissions(props.userInformation, ["admin.employee.create"]) && props.roles != -1 ? (
            <button
              className="action-button filter jsFilter"
              onClick={() => {
                props.setAddNew(true);
              }}
            >
              موظف جديد
            </button>
          ) : null}

          <div className="app-content-actions-wrapper">
            <div className="filter-button-wrapper">
              <button
                className="action-button filter jsFilter"
                onClick={() => {
                  setOpenFilter(true);
                }}
              >
                <span>فلتر</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
              {openFilter ? <EmployeesFilter roles={props.roles} filter={props.filter} setFilter={props.setFilter} tempFilter={tempFilter} setTempFilter={setTempFilter} setOpenFilter={setOpenFilter} /> : null}
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default EmployeesHeader;
