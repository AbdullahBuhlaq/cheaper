import * as faw from "react-icons/fa";

function getIcon(iconName) {
  const Cur = faw[iconName];
  if (Cur) {
    return <Cur />;
  } else {
    return "";
  }
}

export default getIcon;
