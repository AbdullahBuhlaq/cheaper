import { useState } from "react";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import loginSchema from "./schema/loginSchema";
import login from "./functions/login";

function Login(props) {
  const navigate = useNavigate();
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [userErrors, setUserErrors] = useState({});

  const joiUser = Joi.object(loginSchema);

  try {
    return (
      <>
        <div class="container">
          <h1>مرحباً بك.</h1>
          <p>واجهة تسجيل الدخول.</p>
          <form>
            <div class="row">
              <Input placeholder={"@example"} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={loginSchema} />
              <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={loginSchema} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="new-account" onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
                لا تمتلك حسابا؟ قم بالتسجيل من هنا
              </div>
              <div className="new-account" onClick={() => navigate("/forgotPassword")} style={{ cursor: "pointer" }}>
                هل نسيت كلمة السر؟
              </div>
            </div>
            <div class="row">
              <div class="column">
                <img src="images/secure.png" style={{ maxHeight: "300px", width: "100%", margin: "4px auto" }} />
              </div>
            </div>
            <Button action={() => login(user, props.toast, setDuringAdd, navigate)} text={"تسجيل دخول"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
          </form>
        </div>
        {/* <div className="form-container">
          <h1>{"Login Now"}</h1>

          <form>
            <div className="row">
              <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={loginSchema} />
              <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={loginSchema} />
            </div>
          </form>
          
        </div> */}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Login;
