import { useEffect, useState } from "react";

function PackItem(props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.className != "dropbtn") {
        setShow(false);
      }
    });
  }, []);
  try {
    return (
      <>
        <div className="plan-container">
          <div className="plan-container-right">
            <div className="plan-container-right-header">
              <h1>{props.pack.name}</h1>

              <div className="dropdown">
                <button
                  className="dropbtn"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  •••
                </button>
                <ul id="myDropdown" className={"dropdown-content" + (show ? " show" : "")}>
                  <li>
                    <a
                      href="#"
                      onClick={() => {
                        props.setAddNew(false);
                        props.setCurrentEdit(props.pack.id);
                      }}
                    >
                      تعديل
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => {
                        props.deletePack(props.pack.id);
                      }}
                    >
                      حذف
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="plan-container-right-body">
              <div className="plan-container-right-body-date">
                <h1 style={{ width: "max-content" }}>الفترة : </h1>
                <h2>{props.pack.duration} يوما</h2>
              </div>

              <div className="plan-container-right-body-price">
                <h1 style={{ width: "max-content" }}>السعر : </h1>
                <h2>{props.pack.price} S.P</h2>
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

export default PackItem;
