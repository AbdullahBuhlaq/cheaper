import { useEffect, useState } from "react";
import Joi from "joi";
import Input from "../../../../components/Input";
import handleSave from "../../../../functions/handleSave";
import selectOptions from "../../../../constants/selectOptions";
import Select from "../../../../components/Select";
import SelectMultiple from "../../../../components/SelectMultiple";
import Button from "../../../../components/Button";
import CheckPasswordInput from "../../../../components/CheckPasswordInput";
import ImageInput from "../../../../components/ImageInput";
import SelectMultipleFromDB from "../../../../components/SelectMultipleFromDB";
import profileSchema from "./schema/profileSchema";
import updateUser from "./function/UpdateUser";

function UpdateUserProfile(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    name: props.currentEdit.name,
    gender: props.currentEdit.gender,
    birthday: props.currentEdit.birthday,
    username: props.currentEdit.username,
    category: props.userProfile.category.map((cat) => {
      return cat.name;
    }),

    phoneNumber: props.currentEdit.phoneNumber,
  });

  useEffect(() => {
    setUser({
      name: props.currentEdit.name,
      gender: props.currentEdit.gender,
      birthday: props.currentEdit.birthday,
      username: props.currentEdit.username,
      category: props.userProfile.category.map((cat) => {
        return cat.name;
      }),

      phoneNumber: props.currentEdit.phoneNumber,
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
            <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} />
            {/* <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} /> */}
            <Input placeholder={""} label={"تاريخ الميلاد"} type={"date"} name={"birthday"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} />
            <Input placeholder={""} label={"رقم لهاتف"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} />
            <SelectMultipleFromDB label={"الأصناف المفضلة"} placeholder={"اختر الأصناف المفضلة..."} list={props.categories} showKey={"name"} valueKey={"name"} name={"category"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={profileSchema} />
            <ImageInput setImage={setImage} />
          </div>
        </form>
        <Button action={() => updateUser(user, props.currentEdit, setDuringAdd, image, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.userProfile, props.setUserProfile, props.toast, props.setCurrentEdit)} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdateUserProfile;
