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
import SelectMultipleFromDB from "../../../components/SelectMultipleFromDB";
import userSchema from "./schema/userRegister";
import registerUser from "./functions/registerUser";

function UserRegisterForm(props) {
  const navigate = useNavigate();
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    name: "",
    gender: "",
    category: [],
    phoneNumber: "",
    birthday: "",
    username: "",
    password: "",
  });

  const [userErrors, setUserErrors] = useState({});

  const joiUser = Joi.object(userSchema);

  const [categories, setCategories] = useState(-1);
  useEffect(() => {
    getGeneralCategories(setCategories, props.toast);
  }, []);

  try {
    return (
      <>
        {categories == -1 ? (
          <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Loading />
          </div>
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
                <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
                <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
                <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
                <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
                <CheckPasswordInput password={user.password} errors={userErrors} setErrors={setUserErrors} />
                <Input placeholder={""} label={"رقم الهاتف"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
                <Input placeholder={""} label={"تاريخ الميلاد"} type={"date"} name={"birthday"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
                <SelectMultipleFromDB label={"صنف المحل"} placeholder={"اختر تصنيف المحل..."} list={categories} showKey={"name"} valueKey={"name"} name={"category"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={userSchema} />
              </div>
              <Button action={() => registerUser(user, props.toast, navigate, setDuringAdd)} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
            </form>
          </div>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserRegisterForm;
