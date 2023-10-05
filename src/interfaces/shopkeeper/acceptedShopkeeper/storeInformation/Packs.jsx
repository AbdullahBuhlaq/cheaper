import { useState } from "react";
import NewPackItem from "./NewPackItem";
import newPackSchema from "./schema/newPackSchema";
import addNewPackFunc from "./functions/addNewPack";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Joi from "joi";
import handleSave from "../../../../functions/handleSave";

function NewPacks(props) {
  const [currentPack, setCurrentPack] = useState(-1);
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({
    discount: 15,
  });

  const [userErrors, setUserErrors] = useState({});

  const joiUser = Joi.object(newPackSchema);

  async function addNewPack() {
    if (currentPack == -1) {
      props.toast.info("يرجى اختيار باقة", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else addNewPackFunc(props.setEdit, setDuringAdd, props.setStoreInformation, props.storeInformation, props.packs[currentPack], user.discount, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
  }
  try {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <form style={{ overflow: "hidden" }}>
            <div className="row" style={{ display: "flex", alignItems: "end" }}>
              <Input placeholder={""} label={"نسبة الحسم"} type={"number"} name={"discount"} onChange={handleSave} state={user} setState={setUser} errors={userErrors} setErrors={setUserErrors} schema={newPackSchema} />
              <Button action={addNewPack} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
            </div>
          </form>
          <div style={{ display: "flex" }}>
            {Object.keys(props.packs).map((itemKey, index) => {
              return <NewPackItem key={index} item={props.packs[itemKey]} currentPack={currentPack} setCurrentPack={setCurrentPack} />;
            })}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default NewPacks;
