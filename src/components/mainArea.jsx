import { FaLeaf } from "react-icons/fa";

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
          >
            <FaLeaf />
            left
          </button>
          <button
            className="btn-show-right-area"
            onClick={() => {
              document.getElementsByClassName("new-right-area")[0].classList.add("show");
            }}
          >
            <FaLeaf />
            right
          </button>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default HeaderButton;
