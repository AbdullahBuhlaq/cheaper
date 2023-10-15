import selectOptions from "../constants/selectOptions";

function FilterItem(props) {
  try {
    return (
      <>
        <div className="search-container">
          <div className="search-filters-container">
            <div className="filter-name">{props.item.name}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "start", padding: "0px 10px 10px 10px" }}>
              <select
                value={props.item.operator}
                onChange={(e) => {
                  props.setFilter({ ...props.filter, [props.filterKey]: { ...props.filter[props.filterKey], operator: e.target.value } });
                }}
                className={"search-bar"}
                style={{ marginLeft: "15px", backgroundImage: "none", width: "100%", marginTop: "5px", padding: "12px", border: "none", borderBottom: "3px solid #0298ff", color: "var(--main-font-color)", borderRadius: "6px", float: "center", backgroundColor: "var(--cards-area-bg)", boxShadow: "0px 3px 7px #3a3a3a2e !important", marginBottom: 0 }}
              >
                <option value={null}>أدخل طريقة المقارنة...</option>
                {selectOptions.operators[props.item.type].map((operator, operatorIndex) => {
                  return (
                    <option key={operatorIndex} value={operator.value}>
                      {operator.name}
                    </option>
                  );
                })}
              </select>

              {props.item.type == "select" ? (
                <select
                  onChange={(e) => {
                    props.setFilter({ ...props.filter, [props.filterKey]: { ...props.filter[props.filterKey], value: e.target.value } });
                  }}
                  className={"search-bar"}
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    padding: "12px",
                    /* border: none, */
                    borderBottom: "3px solid #0298ff",
                    color: "var(--main-font-color)",
                    borderRadius: "6px",
                    float: "center",
                    backgroundColor: "var(--cards-area-bg)",
                    boxShadow: "0px 3px 7px #3a3a3a2e !important",
                    backgroundImage: "none",
                    marginBottom: 0,
                  }}
                >
                  <option value={null}>أدخل القيمة ...</option>
                  {selectOptions[props.filterKey].map((option, optionIndex) => {
                    return (
                      <option key={optionIndex} value={option.value}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              ) : props.item.type == "array" ? (
                <select
                  onChange={(e) => {
                    props.setFilter({ ...props.filter, [props.filterKey]: { ...props.filter[props.filterKey], value: e.target.value } });
                  }}
                  className={"search-bar"}
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    padding: "12px",
                    /* border: none, */
                    borderBottom: "3px solid #0298ff",
                    color: "var(--main-font-color)",
                    borderRadius: "6px",
                    float: "center",
                    backgroundColor: "var(--cards-area-bg)",
                    boxShadow: "0px 3px 7px #3a3a3a2e !important",
                    backgroundImage: "none",
                    marginBottom: 0,
                  }}
                >
                  <option value={null}>أدخل القيمة ...</option>
                  {selectOptions[props.filterKey].map((option, optionIndex) => {
                    return (
                      <option key={optionIndex} value={option.value}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              ) : props.item.type == "selectFromObj" ? (
                <select
                  onChange={(e) => {
                    props.setFilter({ ...props.filter, [props.filterKey]: { ...props.filter[props.filterKey], value: e.target.value } });
                  }}
                  className={"search-bar"}
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    padding: "12px",
                    /* border: none, */
                    borderBottom: "3px solid #0298ff",
                    color: "var(--main-font-color)",
                    borderRadius: "6px",
                    float: "center",
                    backgroundColor: "var(--cards-area-bg)",
                    boxShadow: "0px 3px 7px #3a3a3a2e !important",
                    backgroundImage: "none",
                    marginBottom: 0,
                  }}
                  defaultValue={props.item.value}
                >
                  <option value={null}>أدخل القيمة ...</option>
                  {Object.keys(props.list).map((optionKey, optionIndex) => {
                    return (
                      <option key={optionIndex} value={props.list[optionKey][props.item.valueName]}>
                        {props.list[optionKey][props.item.showName]}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  type={props.item.type}
                  value={props.item.value}
                  onChange={(e) => {
                    props.setFilter({ ...props.filter, [props.filterKey]: { ...props.filter[props.filterKey], value: e.target.value } });
                  }}
                  className={"search-bar"}
                  style={{ backgroundImage: "none", padding: "9px" }}
                  placeholder="أدخل القيمة ..."
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default FilterItem;
