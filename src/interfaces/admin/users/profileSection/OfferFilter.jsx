import FilterSelect from "../../../../components/FilterSelect";
import selectOptions from "../../../../constants/selectOptions";

function OfferFilter(props) {
  try {
    return (
      <>
        <div className="filter-menu active">
          <FilterSelect state={props.tempFilter} setState={props.setTempFilter} name={"statePaid"} label={"حالة العرض"} placeholder={"أيا يكن"} list={selectOptions.statePaid} />
          <FilterSelect state={props.tempFilter} setState={props.setTempFilter} name={"type"} label={"نوع العرض"} placeholder={"أيا يكن"} list={selectOptions.typeStore} />
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

            {props.tempFilter.statePaid != -1 || (props.tempFilter.type != -1) != -1 ? (
              <button
                className="filter-button reset"
                onClick={() => {
                  props.setTempFilter({ search: props.tempFilter.search, statePaid: -1, type: -1 });
                  props.setFilter({ ...props.filter, search: props.tempFilter.search, statePaid: -1, type: -1 });
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

export default OfferFilter;
