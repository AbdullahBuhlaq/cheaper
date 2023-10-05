import { useState } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import CheckBox from "../../../components/CheckBox";
import handleSave from "../../../functions/handleSave";
import Button from "../../../components/Button";
import ChooseIcon from "./ChooseIcon";
import addCategory from "./functions/addCategory";
import selectOptions from "../../../constants/selectOptions";
import categorySchema from "./schema/categorySchema";
import Select from "../../../components/Select";

function AddCategory(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [category, setCategory] = useState({
    name: "",
    checkWithImageOrNot: "بدون صور حالات",
    emoji: "",
  });

  const [categoryErrors, setCategoryErrors] = useState({});

  const joiCategory = Joi.object(categorySchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={category} setState={setCategory} errors={categoryErrors} setErrors={setCategoryErrors} schema={categorySchema} />
            <Select placeholder={""} label={"له صور حالة؟"} name={"checkWithImageOrNot"} list={selectOptions.checkWithImageOrNot} onChange={handleSave} state={category} setState={setCategory} errors={categoryErrors} setErrors={setCategoryErrors} schema={categorySchema} />
            <ChooseIcon label={"اختر أيقونة"} name={"emoji"} onChange={handleSave} state={category} setState={setCategory} errors={categoryErrors} setErrors={setCategoryErrors} schema={categorySchema} />
          </div>
          <Button action={() => addCategory(category, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAdd, props.setAddNew, props.categories, props.setCategories, props.toast)} text={"إرسال"} disabled={duringAdd} joiObject={joiCategory} state={category} setStateErrors={setCategoryErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddCategory;
