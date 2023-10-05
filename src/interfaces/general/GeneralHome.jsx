import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";

function GeneralHome(props) {
  const [currentTab, setCurrentTab] = useState("home");

  try {
    return (
      <>
        <Navbar tabs={[]} setCurrentTab={setCurrentTab} currentTab={currentTab} toast={props.toast} navigate={props.navigate} />

        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/main" exact element={<Main />} />
        </Routes>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default GeneralHome;
