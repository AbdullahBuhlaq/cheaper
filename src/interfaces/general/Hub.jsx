import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHome from "../admin/AdminHome";
import GeneralHome from "./GeneralHome";
import UserHome from "../user/UserHome";
import ShopkeeperHome from "../shopkeeper/acceptedShopkeeper/ShopkeeperHome";
import PendingShopkeeperHome from "../shopkeeper/pendingShopkeeper/PendingShopkeeperHome";
import secureLocalStorage from "react-secure-storage";
function Hub(props) {
  const [userInformation, setUserInformation] = useState(-1);
  const [refreshStatus, setRefreshStatus] = useState("good");

  const [hub, setHub] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const result = JSON.parse(secureLocalStorage.getItem("userInformation"));
      if (result?.token) {
        setUserInformation({ ...result });
        if (result.typeUser == "مستخدم") setHub("user");
        else if (result.typeUser == "مدير محل جديد") setHub("newShopkeeper");
        else if (result.typeUser == "مدير محل مقبول") setHub("shopkeeper");
        else if (result.typeUser == "مدير") setHub("admin");
      } else setHub("general");
    } catch (err) {
      console.log(err);
    }
  }, []);

  try {
    return (
      <>
        {hub == "user" && userInformation != -1 ? (
          <UserHome userInformation={userInformation} setUserInformation={setUserInformation} refreshStatus={refreshStatus} setRefreshStatus={setRefreshStatus} toast={props.toast} navigate={navigate} />
        ) : hub == "admin" && userInformation != -1 ? (
          <AdminHome userInformation={userInformation} setUserInformation={setUserInformation} refreshStatus={refreshStatus} setRefreshStatus={setRefreshStatus} toast={props.toast} navigate={navigate} />
        ) : hub == "shopkeeper" && userInformation != -1 ? (
          <ShopkeeperHome userInformation={userInformation} setUserInformation={setUserInformation} refreshStatus={refreshStatus} setRefreshStatus={setRefreshStatus} toast={props.toast} navigate={navigate} />
        ) : hub == "newShopkeeper" && userInformation != -1 ? (
          <PendingShopkeeperHome userInformation={userInformation} setUserInformation={setUserInformation} refreshStatus={refreshStatus} setRefreshStatus={setRefreshStatus} toast={props.toast} navigate={navigate} />
        ) : hub == "general" ? (
          <GeneralHome toast={props.toast} navigate={navigate} />
        ) : null}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Hub;
