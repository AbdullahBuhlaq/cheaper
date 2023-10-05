import FilterSelect from "../../../components/FilterSelect";
import FilterSelectFromDB from "../../../components/FilterSelectFromDB";
import selectOptions from "../../../constants/selectOptions";

function AcceptedFilter(props) {
  try {
    return (
      <>
        <div className="filter-menu active">
          <FilterSelect state={props.tempFilter} setState={props.setTempFilter} name={"city"} label={"المدينة"} placeholder={"أيا يكن"} list={selectOptions.city} />
          <FilterSelectFromDB state={props.tempFilter} setState={props.setTempFilter} name={"category"} label={"الصنف"} placeholder={"أيا يكن"} list={props.categories} valueKey={"name"} nameKey={"name"} />
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

            {props.tempFilter.city != -1 || props.tempFilter.category != -1 ? (
              <button
                className="filter-button reset"
                onClick={() => {
                  props.setTempFilter({ search: props.tempFilter.search, city: -1, type: true, category: -1 });
                  props.setFilter({ ...props.filter, search: props.tempFilter.search, city: -1, type: true, category: -1 });
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

export default AcceptedFilter;
