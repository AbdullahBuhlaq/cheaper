import { GoSidebarCollapse } from "react-icons/go";
import { FaBars } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

function HeaderButton(props) {
  try {
    return (
      <>
        <div className="main-buttons-container" style={{ height: "50px", justifyContent: "left", alignItems: "center", position: "absolute", top: 0 }}>
          <button
            className="btn-show-left-area"
            onClick={() => {
              document.getElementsByClassName("left-area")[0].classList.add("show");
            }}
            style={{ minWidth: "max-content", fontSize: "18px" }}
          >
            <FaBars />
          </button>
          {props.noRight ? null : (
            <button
              className="btn-show-right-area"
              onClick={() => {
                document.getElementsByClassName("new-right-area")[0].classList.add("show");
              }}
              style={{ minWidth: "max-content", fontSize: "18px" }}
            >
              <GoSidebarCollapse />
            </button>
          )}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default HeaderButton;
