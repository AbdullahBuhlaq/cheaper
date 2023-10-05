import { useEffect } from "react";

function Popup(props) {
  useEffect(() => {
    var modal = document.querySelector("#modal-window");
    window.onclick = function (event) {
      if (event.target == modal) {
        props.setOpen(false);
      }
    };
  }, []);

  try {
    return (
      <>
        <div id="modal-window" className={"shadow hideModal showModal"} style={{ position: "fixed", zIndex: 50 }}>
          <div className={props.classes ? props.classes : "main-modal"}>
            <button
              className="btn btn-close"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {props.component}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Popup;
