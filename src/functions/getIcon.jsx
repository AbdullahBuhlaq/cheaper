import * as faw from "react-icons/fc";

function getIcon(iconName) {
  const Cur = faw[iconName];
  if (Cur) {
    return <Cur />;
  } else {
    return "";
  }
}

export default getIcon;
