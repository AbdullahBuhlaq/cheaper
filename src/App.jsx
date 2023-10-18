import Login from "./interfaces/general/Login";
import Register from "./interfaces/general/Register";
import Hub from "./interfaces/general/Hub";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/styletemp.css";
import "./css/formStyle.css";
import "./css/popup.css";
import "./css/textChart.css";
import ForgotPassword from "./interfaces/general/ForgotPassword";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

function App() {
  useEffect(() => {
    if (secureLocalStorage.getItem("mode")) {
      document.body.classList.toggle("dark");
      document.documentElement.classList.toggle("dark");
    }
  }, []);
  try {
    return (
      <>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/login" exact element={<Login toast={toast} />} />
            <Route path="/forgotPassword" exact element={<ForgotPassword toast={toast} />} />
            <Route path="/register" exact element={<Register toast={toast} />} />
            <Route path="/*" exact element={<Hub toast={toast} />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default App;
