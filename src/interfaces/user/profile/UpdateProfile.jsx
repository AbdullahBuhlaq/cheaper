import { useEffect, useState } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import selectOptions from "../../../constants/selectOptions";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import ImageInput from "../../../components/ImageInput";
import userSchema from "./schema/updateUserSchema";
import updateUserFunc from "./functions/updateUserFunc";
import SelectMultipleFromDB from "../../../components/SelectMultipleFromDB";

function UpdateProfile(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    name: props.profile.userInformation.name,
    gender: props.profile.userInformation.gender,
    category: props.profile.category.map((cat) => {
      return cat.name;
    }),
    birthday: props.profile.userInformation.birthday,
    username: props.profile.userInformation.username,
  });
  useEffect(() => {
    try {
      setUser({
        name: props.profile.userInformation.name,
        gender: props.profile.userInformation.gender,
        category: props.profile.category.map((cat) => {
          return cat.name;
        }),
        birthday: props.profile.userInformation.birthday,
        username: props.profile.userInformation.username,
      });
    } catch (err) {
      console.log(err);
    }
  }, [props.profile]);

  const [userErrors, setUserErrors] = useState({});

  const joiUser = Joi.object(userSchema);

  const [image, setImage] = useState(false);

  function updateUser() {
    updateUserFunc(user, image, props.userInformation, props.profile, props.setProfile, props.toast, setDuringAdd, props.setEdit);
  }

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Input placeholder={""} label={"تاريخ الميلاد"} type={"date"} name={"birthday"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <SelectMultipleFromDB label={"أصناف المحلات المفضلة"} placeholder={"اختر تصنيف المحل..."} list={props.categories} showKey={"name"} valueKey={"name"} name={"category"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <ImageInput setImage={setImage} />
          </div>
          <Button action={updateUser} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdateProfile;
