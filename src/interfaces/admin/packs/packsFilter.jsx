import FilterItem from "../../../components/FilterItem";
import searchOptions from "../../../constants/searchOptions";

function PacksFilter(props) {
  try {
    return (
      <>
        <div className="filter-menu active">
          {Object.keys(props.tempFilter).map((filterKey) => {
            let list = {};
            if (filterKey != "name") return <FilterItem filterKey={filterKey} item={props.tempFilter[filterKey]} filter={props.tempFilter} setFilter={props.setTempFilter} />;
          })}

          <div className="filter-menu-buttons">
            <button
              className="filter-button reset"
              onClick={() => {
                props.setOpenFilter(false);
              }}
            >
              إغلاق
            </button>
            <button
              className="filter-button reset"
              onClick={() => {
                props.setFilter({ ...props.filter, ...props.tempFilter });
                props.setOpenFilter(false);
              }}
            >
              تطبيق
            </button>

            {true ? (
              <button
                className="filter-button reset"
                onClick={() => {
                  props.setTempFilter({ ...searchOptions.packs, name: { ...props.filter.name } });
                  props.setFilter({ ...searchOptions.packs, name: { ...props.filter.name } });
                  props.setOpenFilter(false);
                }}
              >
                إلغاء الفلتر
              </button>
            ) : null}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PacksFilter;
