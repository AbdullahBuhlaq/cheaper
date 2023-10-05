import { useState } from "react";

function NewPackItem(props) {
  try {
    return (
      <>
        <div className={"plan-container" + (props.currentPack == props.item.id ? " choosen-pack" : "")} onClick={() => props.setCurrentPack(props.item.id)} style={{ width: "max-content", height: "max-content", cursor: "pointer" }}>
          <div className="plan-container-right">
            <div className="plan-container-right-header">
              <h1 style={{ width: "max-content" }}>{props.item.name}</h1>
            </div>

            <div className="plan-container-right-body">
              <div className="plan-container-right-body-date">
                <h1 style={{ width: "max-content" }}>الفترة : </h1>
                <h2>{props.item.duration} يوما</h2>
              </div>

              <div className="plan-container-right-body-price">
                <h1 style={{ width: "max-content" }}>السعر : </h1>
                <h2>{props.item.price} S.P</h2>
              </div>
            </div>
          </div>

          {/* <div className="plan-container-left">
           <h1>testtttttttt</h1>
      </div> */}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default NewPackItem;
