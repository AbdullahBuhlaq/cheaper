import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Services from "./Services";
import AboutUs from "./AboutUs";
import Contact from "./Contact";
import Page404 from "./Page404";

function GeneralHome(props) {
  const [currentTab, setCurrentTab] = useState("main");

  try {
    return (
      <>
        <Navbar tabs={[]} setCurrentTab={setCurrentTab} currentTab={currentTab} toast={props.toast} navigate={props.navigate} />

        <Routes>
          <Route path="/" exact element={<Main toast={props.toast} />} />
          <Route path="/main" exact element={<Main toast={props.toast} />} />
          <Route path="/*" exact element={<Page404 />} />
        </Routes>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default GeneralHome;
