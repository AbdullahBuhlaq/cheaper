import FilterSelect from "../../../components/FilterSelect";
import FilterSelectMultipleFromDB from "../../../components/FilterSelectMultipleFromDB";
import selectOptions from "../../../constants/selectOptions";

function OffersFilter(props) {
  try {
    return (
      <>
        <div className="filter-menu active">
          <FilterSelect state={props.tempFilter} setState={props.setTempFilter} name={"state"} label={"ملكية العرض"} placeholder={"أيا يكن"} list={selectOptions.offerState} noChoose={true} />
          <FilterSelect state={props.tempFilter} setState={props.setTempFilter} name={"typeOffer"} label={"نوع العرض"} placeholder={"أيا يكن"} list={selectOptions.typeOffer} />
          <FilterSelectMultipleFromDB state={props.tempFilter} setState={props.setTempFilter} name={"categoryIds"} label={"الصنف"} placeholder={"أيا يكن"} list={props.categories} nameKey={"name"} valueKey={"id"} />
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

            {props.tempFilter.state != -1 || props.tempFilter.typeOffer != -1 || props.tempFilter.categoryIds.length != 0 ? (
              <button
                className="filter-button reset"
                onClick={() => {
                  props.setTempFilter({ search: props.tempFilter.search, state: "عادي", typeOffer: -1, categoryIds: [] });
                  props.setFilter({ ...props.filter, search: props.tempFilter.search, state: "عادي", typeOffer: -1, categoryIds: [] });
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

export default OffersFilter;
