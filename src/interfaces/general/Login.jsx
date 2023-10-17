import { useEffect, useState } from "react";
import Joi from "joi";
import Input from "../../components/Input";
import handleSave from "../../functions/handleSave";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import loginSchema from "./schema/loginSchema";
import login from "./functions/login";
import secureLocalStorage from "react-secure-storage";
import Loading from "./Loading";

function Login(props) {
  const navigate = useNavigate();
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [userErrors, setUserErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const result = JSON.parse(secureLocalStorage.getItem("userInformation"));
      if (result?.token) {
        navigate("/main");
      }
      setLoading(result?.token ? true : false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const joiUser = Joi.object(loginSchema);

  try {
    return (
      <>
        {loading ? (
          <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Loading />
          </div>
        ) : (
          <div className="container">
            <h1>مرحباً بك.</h1>
            <p>واجهة تسجيل الدخول.</p>
            <form>
              <div className="row">
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
              <div className="row">
                <div className="column">
                  <img src="images/secure.png" style={{ maxHeight: "300px", width: "100%", margin: "4px auto" }} />
                </div>
              </div>
              <Button action={() => login(user, props.toast, setDuringAdd, navigate)} text={"تسجيل دخول"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
            </form>
          </div>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Login;
