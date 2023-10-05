import { useState } from "react";
import Button from "../../../../components/Button";
import ImageInput from "../../../../components/ImageInput";
import updateImage from "./functions/updateImage";
import Joi from "joi";

function NewImage(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({});

  const [userErrors, setUserErrors] = useState({});

  const joiUser = Joi.object({});

  const [image, setImage] = useState(false);

  async function updateProfileFunc() {
    updateImage(setDuringAdd, image, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setStoreInformation, props.storeInformation, props.setEdit, props.toast);
  }

  try {
    return (
      <>
        <form>
          <div className="row">
            <ImageInput setImage={setImage} />
          </div>
          <Button action={updateProfileFunc} text={"إرسال"} disabled={duringAdd} joiObject={joiUser} state={user} setStateErrors={setUserErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default NewImage;
