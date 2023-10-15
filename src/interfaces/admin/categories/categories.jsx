import { useEffect, useState } from "react";
import Loading from "../../general/Loading";
import requestOptions from "../../../constants/requestOptions";
import AddCategory from "./AddCategory";
import CategoryItem from "./CategoryItem";
import UpdateCategory from "./UpdateCategory";
import getCategories from "./functions/getCategories";
import "./css/categories.css";
import CategoriesCharts from "./CategoriesCharts";
import Popup from "../../general/Popup";
import CategoryHeader from "./CategorySearch";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import HeaderButton from "../../../components/mainArea";
import checkPermissions from "../../../functions/checkPermission";
import NotAllowdPage from "../../general/NotAllowedPage";

function Categories(props) {
  const [loading, setLoading] = useState(true);
  const [addNew, setAddNew] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(false);
  const [filter, setFilter] = useState(searchOptions.categories);

  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.categories).map(async (categoryId, categoryIndex) => {
            const isTrue = await compare(filter, { name: props.categories[categoryId].name, offerTaken: props.categories[categoryId]?.count?.offerTaken, user: props.categories[categoryId]?.count?.user, store: props.categories[categoryId]?.count?.store });
            if (isTrue) {
              return (
                <CategoryItem
                  key={categoryIndex}
                  category={props.categories[categoryId]}
                  categories={props.categories}
                  setCategories={props.setCategories}
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

      if (props.categories != -1) populateArray();
    } catch (err) {
      console.log("error", props.categories);
      console.log(err);
    }
  }, [props.categories, currentEdit, filter]);

  useEffect(() => {
    if (props.categories == -1 && checkPermissions(props.userInformation, ["admin.category.all"])) getCategories(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setCategories, props.toast);
  }, []);
  useEffect(() => {
    if (props.categories != -1) setLoading(false);
  }, [props.categories]);

  try {
    return checkPermissions(props.userInformation, ["admin.category.all"]) ? (
      <>
        {loading ? (
          <div className="profile-main-area">
            <Loading />
          </div>
        ) : (
          <>
            <div className="profile-main-area">
              <HeaderButton />

              <div className="main-categories">
                <section className="categories-left">
                  <CategoryHeader userInformation={props.userInformation} setAddNew={setAddNew} filter={filter} setFilter={setFilter} />

                  {items.map((item) => {
                    return item;
                  })}
                </section>
              </div>
            </div>

            {addNew ? (
              <>
                <Popup setOpen={setAddNew} classes={"form-popup-small"} component={<AddCategory categories={props.categories} setCategories={props.setCategories} setAddNew={setAddNew} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} navigate={props.navigate} toast={props.toast} />} />
              </>
            ) : null}
            {currentEdit ? (
              <>
                <Popup
                  setOpen={setCurrentEdit}
                  classes={"form-popup-small"}
                  component={<UpdateCategory categories={props.categories} setCategories={props.setCategories} currentEdit={props.categories[currentEdit]} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} navigate={props.navigate} toast={props.toast} />}
                />
              </>
            ) : null}
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

export default Categories;
