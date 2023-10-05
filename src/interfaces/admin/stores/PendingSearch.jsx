import { useState } from "react";
import PendingFilter from "./PendingFilter";

function PendingSearch(props) {
  const [tempFilter, setTempFilter] = useState({ search: "", city: -1, type: false, category: -1 });
  const [openFilter, setOpenFilter] = useState(false);

  try {
    return (
      <>
        <div className="app-content-actions">
          <input
            className="search-bar"
            placeholder="بحث..."
            type="text"
            value={tempFilter.search}
            onChange={(event) => {
              setTempFilter({ ...tempFilter, search: event.target.value });
            }}
          />
          <button
            className="action-button filter jsFilter"
            onClick={() => {
              props.setFilter({ ...tempFilter });
            }}
          >
            بحث
          </button>
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
              {openFilter ? <PendingFilter filter={props.filter} setFilter={props.setFilter} tempFilter={tempFilter} setTempFilter={setTempFilter} setOpenFilter={setOpenFilter} categories={props.categories} /> : null}
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PendingSearch;
