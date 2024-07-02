import { useState } from "react";
import Button from "../../../../components/Button";
import ImageInput from "../../../../components/ImageInput";
import updateImage from "./functions/updateImage";
import Joi from "joi";
import updateStatus from "./functions/updateStatus";
import deleteStatusFunc from "./functions/deleteStatusFunc";
import getAvater from "../../../../functions/getAvater";

function NewStatus(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [user, setUser] = useState({});

  const [userErrors, setUserErrors] = useState({});

  const joiUser = Joi.object({});

  const [image, setImage] = useState(false);

  const [currentStatus, setCurrentStatus] = useState(-1);

  async function updateProfileFunc() {
    updateStatus(
      setDuringAdd,
      image,
      props.userInformation,
      props.setUserInformation,
      props.refreshStatus,
      props.setRefreshStatus,
      props.setStoreInformation,
      props.storeInformation,
      props.setEdit,
      props.toast
    );
  }
  async function deleteStatus() {
    if (currentStatus == -1) {
      props.toast.infor("يرجى تحديد صورة", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
    deleteStatusFunc(
      setDuringAdd,
      currentStatus,
      props.userInformation,
      props.setUserInformation,
      props.refreshStatus,
      props.setRefreshStatus,
      props.setStoreInformation,
      props.storeInformation,
      props.setEdit,
      props.toast
    );
  }

  try {
    return (
      <>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <form style={{ overflow: "hidden" }}>
            <div className="row" style={{ display: "flex", alignItems: "end" }}>
              <ImageInput
                setImage={setImage}
                imageTitle={"صورة حالة جديدة"}
                disabled={props.storeInformation.story.length >= 3}
              />
              <Button
                action={updateProfileFunc}
                text={"إرسال"}
                disabled={duringAdd}
                joiObject={joiUser}
                state={user}
                setStateErrors={setUserErrors}
                toast={props.toast}
              />
            </div>
          </form>

          {props.storeInformation.story.length ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  gap: "15px",
                  height: "150px",
                  overflow: "visible",
                }}
              >
                {props.storeInformation.story.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        width: "90%",
                        height: "100%",
                        borderRadius: "25px",
                        cursor: "pointer",
                      }}
                      onClick={() => setCurrentStatus(item.id)}
                    >
                      <img
                        src={getAvater(item.path)}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "25px",
                          border:
                            currentStatus == item.id ? "3px solid blue" : "",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <form style={{ overflow: "hidden" }}>
                <Button
                  action={deleteStatus}
                  text={"حذف"}
                  disabled={duringAdd}
                  joiObject={joiUser}
                  state={user}
                  setStateErrors={setUserErrors}
                  toast={props.toast}
                />
              </form>
            </>
          ) : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default NewStatus;
