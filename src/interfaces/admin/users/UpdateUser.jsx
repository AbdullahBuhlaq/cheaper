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
import profileSchema from "./profileSection/schema/profileSchema";

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
    phoneNumber: props.currentEdit.phoneNumber,
    imageStatus: "same",
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
      phoneNumber: props.currentEdit.phoneNumber,
      imageStatus: "same",
    });
  }, [props.currentEdit]);

  const [userErrors, setUserErrors] = useState({});

  const joiUser = Joi.object(profileSchema);

  const [image, setImage] = useState(false);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} />
            <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} />
            <Input placeholder={""} label={"رقم الموبايل"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} />
            <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} />
            {/* <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} /> */}
            <Input placeholder={""} label={"تاريخ الميلاد"} type={"date"} name={"birthday"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} />
            <SelectMultipleFromDB label={"صنف المحل"} placeholder={"اختر تصنيف المحل..."} list={props.categories} showKey={"name"} valueKey={"name"} name={"category"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} />
            <Select label={"الصورة الشخصية"} placeholder={""} list={selectOptions.imageStatus} name={"imageStatus"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} noChoose={true} />
            {user.imageStatus == "edit" ? <ImageInput setImage={setImage} /> : null}
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
