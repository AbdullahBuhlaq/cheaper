import { useState } from "react";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import sendGiftSchema from "./schema/sendGiftSchema";
import Joi from "joi";
import Button from "../../../components/Button";
import checkUser from "./functions/checkUser";
import jsonParse from "../../../functions/jsonParse";
import { BsFillGiftFill } from "react-icons/bs";
import sendGift from "./functions/sendGift";
import { userImag } from "../../../constants/story";

function SendGift(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [lastSearch, setLastSearch] = useState("");
  const [user, setUser] = useState({
    username: "",
  });
  const [currentGift, setCurrentGift] = useState(-1);

  const [users, setUsers] = useState(-1);

  const [userErrors, setUserErrors] = useState({});

  const joiUser = Joi.object(sendGiftSchema);
  try {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <form>
            <div className="row">
              <div style={{ display: "flex", alignItems: "end" }}>
                <Input placeholder={"ابحث عن اسم المستخدم الئي تريد إهداءه"} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={sendGiftSchema} />
                <Button action={() => checkUser(setDuringAdd, props.toast, user.username, setUsers, setLastSearch)} text={"بحث"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
              </div>
            </div>
          </form>
          <div style={{ maxHeight: "75%", overflow: "auto" }}>
            {users == -1 ? (
              <></>
            ) : (
              <>
                {users.map((item, index) => {
                  return (
                    <div className="card-wrapper" style={{ width: "100%" }}>
                      <div className="card">
                        <div className="profile-info-wrapper" style={{ display: "flex", alignItems: "center" }}>
                          <div className="profile-img-wrapper">
                            <img src={item.avatar ? jsonParse(item.avatar)[1] : userImag} style={{ width: "32px", height: "32px", objectFit: "cover" }} />
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
                            <span>{item.name}</span>
                            <span style={{ fontSize: "13px", opacity: "0.8" }}>{item.username}@</span>
                          </div>
                          <span style={{ width: "30px", height: "30px", marginRight: "auto", opacity: "0.8", cursor: "pointer", marginLeft: "5px", alignSelf: "end" }}>
                            {currentGift == -1 ? (
                              <BsFillGiftFill onClick={() => sendGift(props.setCurrentOffer, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast, setCurrentGift, props.offer, item.username, props.offers, props.setOffers, props.setEdit)} />
                            ) : (
                              <>
                                {currentGift == item.username ? (
                                  <video className="loading-video" autoPlay loop muted playsInline style={{ backgroundColor: "transparent" }}>
                                    <source src="videos/1.webm" type="video/webm" />
                                  </video>
                                ) : null}
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {users.length == 0 ? "لا يوجد مستخدم يحتوي اسم " + lastSearch : null}
              </>
            )}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SendGift;
