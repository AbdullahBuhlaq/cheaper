import { useEffect, useState } from "react";
import Joi from "joi";
import Input from "../../../../components/Input";
import handleSave from "../../../../functions/handleSave";
import selectOptions from "../../../../constants/selectOptions";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";
import ImageInput from "../../../../components/ImageInput";
import userSchema from "./schema/profileSchema";
import updateProfile from "./functions/updateProfile";

function UpdateProfile(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    name: props.profile.name,
    gender: props.profile.gender,
    birthday: props.profile.birthday,
    username: props.profile.username,
  });
  useEffect(() => {
    try {
      setUser({
        name: props.profile.name,
        gender: props.profile.gender,
        birthday: props.profile.birthday,
        username: props.profile.username,
      });
    } catch (err) {
      console.log(err);
    }
  }, [props.profile]);

  const [userErrors, setUserErrors] = useState({});

  const joiUser = Joi.object(userSchema);

  const [image, setImage] = useState(false);

  async function updateProfileFunc() {
    updateProfile(user, setDuringAdd, image, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setProfile, props.profile, props.setEdit, props.toast);
  }

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Input placeholder={""} label={"تاريخ الميلاد"} type={"date"} name={"birthday"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
            <ImageInput setImage={setImage} />
          </div>
          <Button action={updateProfileFunc} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdateProfile;
