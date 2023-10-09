import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserRegisterForm from "../user/register/UserRegisterForm";
import ShopkeeperRegisterForm from "../shopkeeper/register/ShopkeeperRegisterForm";
import "./css/register.css";

function Register(props) {
  const [stepNumber, setStepNumber] = useState(0);
  const [userType, setUserType] = useState(0);
  const navigate = useNavigate();

  try {
    return (
      <>
        {stepNumber == 0 ? (
          <>
            <div className="form-container" style={{ width: "70%" }}>
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

              <h1>أنشئ حساباً معنا</h1>
              <img src="images/form.png" alt="" style={{ maxHeight: "400px" }} />
              <div className="have-account" style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}>
                {"تمتلك حسابا بالفعل؟ "}
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  قم بتسجيل الدخول من هنا
                </span>
              </div>
              <div className="Choose">
                <button
                  className="shop-maneger"
                  onClick={(e) => {
                    e.preventDefault();
                    setUserType(0);
                    setStepNumber(1);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  حساب صاحب محل
                </button>

                <button
                  className="costumer"
                  onClick={(e) => {
                    e.preventDefault();
                    setUserType(1);
                    setStepNumber(1);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  حساب مستخدم عادي
                </button>
              </div>
            </div>
            {/* <div className="container33">
              <h1>Create an Account With Us</h1>
              <form>
                <div className="have-account">
                  {"تمتلك حسابا بالفعل؟ "}
                  <span
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    قم بتسجيل الدخول من هنا
                  </span>
                </div>
                <div className="row">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUserType(0);
                      setStepNumber(1);
                    }}
                  >
                    صاحب محل
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setUserType(1);
                      setStepNumber(1);
                    }}
                  >
                    مستخدم عادي
                  </button>
                </div>
              </form>
            </div> */}
          </>
        ) : stepNumber == 1 ? (
          userType == 0 ? (
            <ShopkeeperRegisterForm setStepNumber={setStepNumber} toast={props.toast} />
          ) : (
            <UserRegisterForm setStepNumber={setStepNumber} toast={props.toast} />
          )
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Register;
