import { useState, useEffect } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import CheckBox from "../../../components/CheckBox";
import ChooseIcon from "./ChooseIcon";
import handleSave from "../../../functions/handleSave";
import Button from "../../../components/Button";
import editCategory from "./functions/editCategory";
import selectOptions from "../../../constants/selectOptions";
import categorySchema from "./schema/categorySchema";

function UpdateCategory(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [category, setCategory] = useState({
    name: props.currentEdit.name,
    checkWithImageOrNot: props.currentEdit.checkWithImageOrNot,
    emoji: props.currentEdit.emoji,
  });

  useEffect(() => {
    setCategory({
      name: props.currentEdit.name,
      checkWithImageOrNot: props.currentEdit.checkWithImageOrNot,
      emoji: props.currentEdit.emoji,
    });
  }, [props.currentEdit]);
  const [categoryErrors, setCategoryErrors] = useState({});

  const joiCategory = Joi.object(categorySchema);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={category} setState={setCategory} errors={categoryErrors} setErrors={setCategoryErrors} schema={categorySchema} />
            <CheckBox placeholder={""} label={"له صور حالة؟"} name={"checkWithImageOrNot"} values={selectOptions.checkWithImageOrNot} onChange={handleSave} state={category} setState={setCategory} errors={categoryErrors} setErrors={setCategoryErrors} schema={categorySchema} />
            <ChooseIcon label={"اختر أيقونة"} name={"emoji"} onChange={handleSave} state={category} setState={setCategory} errors={categoryErrors} setErrors={setCategoryErrors} schema={categorySchema} />
          </div>
          <Button action={() => editCategory(category, props.currentEdit, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.categories, setDuringAdd, props.setCurrentEdit, props.setCategories, props.toast)} text={"إرسال"} disabled={duringAdd} joiObject={joiCategory} state={category} setStateErrors={setCategoryErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdateCategory;
