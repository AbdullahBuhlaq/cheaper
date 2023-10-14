import { useEffect, useState } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import selectOptions from "../../../constants/selectOptions";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import CheckPasswordInput from "../../../components/CheckPasswordInput";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import getGeneralCategories from "../../../functions/getGeneralCategories";
import Loading from "../../general/Loading";
import SelectFromDB from "../../../components/SelectFromDB";
import shopkeeperSchema from "./schema/shopkeeperSchema";
import shopRegister from "./functions/shopRegister";
import getCity from "../../user/homePage/functions/getCity";

function ShopkeeperRegisterForm(props) {
  const navigate = useNavigate();
  const [duringAdd, setDuringAdd] = useState(false);

  const [shopkeeper, setShopkeeper] = useState({
    name: "",
    gender: "",
    email: "",
    phoneNumber: "",
    username: "",
    locationText: "",
    password: "",
    nameStore: "",
    longitude: "",
    latitude: "",
    fromHour: "",
    birthday: "",
    toHour: "",
    category: "",
  });

  const [shopkeeperErrors, setShopkeeperErrors] = useState({});

  const joiShopkeeper = Joi.object(shopkeeperSchema);

  const [categories, setCategories] = useState(-1);
  useEffect(() => {
    getGeneralCategories(setCategories, props.toast);
  }, []);

  const [city, setCity] = useState({ status: "" });
  useEffect(() => {
    if (city.status == "error") {
      props.toast.error(city.message, {
        position: props.toast.POSITION.TOP_CENTER,
      });
      setDuringAdd(false);
    } else if (city.status == "success") {
      shopRegister(shopkeeper, props.toast, navigate, setDuringAdd, city);
    }
  }, [city]);

  try {
    return (
      <>
        {categories == -1 ? (
          <Loading />
        ) : (
          <div className="container" style={{ overflow: "auto" }}>
            <div style={{ display: "flex" }}>
              <button
                className="mode-switch"
                onClick={(event) => {
                  event.preventDefault();
                  document.body.classList.toggle("dark");
                  document.documentElement.classList.toggle("dark");
                }}
              >
                <svg className="sun" fill="none" stroke="#fbb046" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <defs></defs>
                  <circle cx="12" cy="12" r="5"></circle>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                </svg>
                <svg className="moon" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <defs></defs>
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                </svg>
              </button>
              <div
                onClick={() => {
                  props.setStepNumber(0);
                }}
                className="back"
                style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}
              >
                رجوع للخلف <MdOutlineArrowBackIosNew />
              </div>
            </div>
            <h1>أنشئ حسابا معنا</h1>
            <form>
              <div className="row">
                <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Input placeholder={""} label={"البريد الإلكتروني"} type={"email"} name={"email"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Input placeholder={""} label={"رقم الهاتف"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Input placeholder={""} label={"العنوان"} type={"text"} name={"locationText"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Input placeholder={""} label={"تاريخ الولادة"} type={"date"} name={"birthday"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Input placeholder={""} label={"كلمة السر"} type={"password"} name={"password"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <CheckPasswordInput password={shopkeeper.password} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} />
                <Input placeholder={""} label={"اسم المحل"} type={"text"} name={"nameStore"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Input placeholder={""} label={"lon"} type={"text"} name={"longitude"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Input placeholder={""} label={"lat"} type={"text"} name={"latitude"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                {/* <Select label={"المدينة"} placeholder={"اختر المدينة التي يقع فيها المحل..."} list={selectOptions.city} name={"city"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} /> */}
                <SelectFromDB label={"صنف المحل"} placeholder={"اختر تصنيف المحل..."} list={categories} showKey={"name"} valueKey={"name"} name={"category"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Input placeholder={""} label={"ساعة الافتتاح"} type={"time"} name={"fromHour"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
                <Input placeholder={""} label={"ساعة الإغلاق"} type={"time"} name={"toHour"} onChange={handleSave} state={shopkeeper} setState={setShopkeeper} errors={shopkeeperErrors} setErrors={setShopkeeperErrors} schema={shopkeeperSchema} />
              </div>
            </form>
            <Button
              action={() => {
                setDuringAdd(true);
                getCity(setCity, { location: { coords: { latitude: shopkeeper.latitude, longitude: shopkeeper.longitude } } });
              }}
              text={"إرسال"}
              disabled={duringAdd}
              joiObject={joiShopkeeper}
              state={shopkeeper}
              setStateErrors={setShopkeeperErrors}
              toast={props.toast}
            />
          </div>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ShopkeeperRegisterForm;
