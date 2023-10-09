import { useEffect, useState } from "react";
import messages from "../../../constants/messages";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import selectOptions from "../../../constants/selectOptions";
import Select from "../../../components/Select";
import SelectMultiple from "../../../components/SelectMultiple";
import Button from "../../../components/Button";
import CheckPasswordInput from "../../../components/CheckPasswordInput";
import ImageInput from "../../../components/ImageInput";
import SelectMultipleFromDB from "../../../components/SelectMultipleFromDB";
import updateUserTop from "./function/updateUserTop";

function UpdateUser(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    name: props.currentEdit.name,
    gender: props.currentEdit.gender,
    birthday: props.currentEdit.birthday,
    username: props.currentEdit.username,
    category: props.currentEdit.categories.map((cat) => {
      return cat.name;
    }),
    password: "",
    phoneNumber: props.currentEdit.phoneNumber,
  });

  useEffect(() => {
    setUser({
      name: props.currentEdit.name,
      gender: props.currentEdit.gender,
      birthday: props.currentEdit.birthday,
      username: props.currentEdit.username,
      category: props.currentEdit.categories.map((cat) => {
        return cat.name;
      }),
      password: "",
      phoneNumber: props.currentEdit.phoneNumber,
    });
  }, [props.currentEdit]);

  const [userErrors, setUserErrors] = useState({});
  const userSchema = {
    name: Joi.string().required().min(2).max(50).trim().messages(messages).label("الاسم"),
    gender: Joi.string().required().messages(messages).label("الجنس"),
    birthday: Joi.date().required().messages(messages).label("تاريخ الميلاد"),
    username: Joi.string()
      .trim()
      .pattern(/[a-zA-Z]+[a-zA-Z0-9\_\.]*$/)
      .min(3)
      .max(30)
      .required()
      .messages(messages)
      .label("اسم المستخدم"),
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة المرور"),
    category: Joi.array().items(Joi.string().trim().min(1).max(50)).min(3).required().messages(messages).label("أصناف المحلات المفضلة"),
    phoneNumber: Joi.string()
      .trim()
      .required()
      .pattern(/^(09)(\d{8})$/)
      .messages(messages),
  };
  const joiUser = Joi.object(userSchema);

  const [image, setImage] = useState(false);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Input placeholder={""} label={"رقم الموبايل"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Input placeholder={""} label={"تاريخ الميلاد"} type={"date"} name={"birthday"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <SelectMultipleFromDB label={"صنف المحل"} placeholder={"اختر تصنيف المحل..."} list={props.categories} showKey={"name"} valueKey={"name"} name={"category"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <ImageInput setImage={setImage} />
          </div>
          <Button action={() => updateUserTop(user, props.currentEdit, setDuringAdd, image, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.users, props.setUsers, props.toast, props.setCurrentEdit)} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdateUser;
