import { useEffect, useState } from "react";
import Joi from "joi";
import Input from "../../../../components/Input";
import handleSave from "../../../../functions/handleSave";
import selectOptions from "../../../../constants/selectOptions";
import Select from "../../../../components/Select";
import SelectFromDB from "../../../../components/SelectFromDB";
import Button from "../../../../components/Button";
import ImageInput from "../../../../components/ImageInput";
import updateStoreInformation from "./functions/updateStoreInformation";
import storeInformationSchema from "./schema/storeSchema";

function UpdateStoreInformation(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    nameStore: props.storeInformation.information.nameStore,
    longitude: props.storeInformation.information.longitude,
    latitude: props.storeInformation.information.latitude,
    fromHour: props.storeInformation.information.fromHour,
    toHour: props.storeInformation.information.toHour,
    category: props.storeInformation.information["category.name"],
    locationText: props.storeInformation.information.locationText,
    city: props.storeInformation.information.city,
  });
  useEffect(() => {
    try {
      setUser({
        nameStore: props.storeInformation.information.nameStore,
        longitude: props.storeInformation.information.longitude,
        latitude: props.storeInformation.information.latitude,
        fromHour: props.storeInformation.information.fromHour,
        toHour: props.storeInformation.information.toHour,
        category: props.storeInformation.information.category,
        locationText: props.storeInformation.information.locationText,
        city: props.storeInformation.information.city,
      });
    } catch (err) {
      console.log(err);
    }
  }, [props.profile]);

  const [userErrors, setUserErrors] = useState({});

  const joiUser = Joi.object(storeInformationSchema);

  const [image, setImage] = useState(false);

  async function updateProfileFunc() {
    updateStoreInformation(user, setDuringAdd, image, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setStoreInformation, props.storeInformation, props.setEdit, props.toast);
  }

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"اسم المحل"} type={"text"} name={"nameStore"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={storeInformationSchema} />
            <Input placeholder={""} label={"ساعة الافتتاح"} type={"time"} name={"fromHour"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={storeInformationSchema} />
            <Input placeholder={""} label={"ساعة الإغلاق"} type={"time"} name={"toHour"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={storeInformationSchema} />
            <Input placeholder={""} label={"العنوان"} type={"text"} name={"locationText"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={storeInformationSchema} />
            <Select label={"المدينة"} placeholder={"اختر المدينة..."} list={selectOptions.city} name={"city"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={storeInformationSchema} />
            <SelectFromDB label={"صنف المحل"} placeholder={"اختر تصنيف المحل..."} list={props.categories == -1 ? {} : props.categories} showKey={"name"} valueKey={"name"} name={"category"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={storeInformationSchema} />
            <ImageInput imageTitle={"صورة المحل"} setImage={setImage} />
          </div>
          <Button action={updateProfileFunc} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdateStoreInformation;
