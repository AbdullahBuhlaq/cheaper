import { GrSystem } from "react-icons/gr";
import { SiWindows, SiWindows11, SiWindows95, SiWindowsxp, SiMacos, SiLinux, SiAndroid, SiIos } from "react-icons/si";

function getSystemIcon(system) {
  if (system.substring(0, 10) == "Windows 10") return <SiWindows />;
  else if (system.substring(0, 10) == "Windows 11") return <SiWindows11 />;
  else if (system.substring(0, 10) == "Windows 95") return <SiWindows95 />;
  else if (system.substring(0, 10) == "Windows xp") return <SiWindowsxp />;
  else if (system.substring(0, 10) == "MacOs") return <SiMacos />;
  else if (system.substring(0, 10) == "IOS") return <SiIos />;
  else if (system.substring(0, 10) == "Linux") return <SiLinux />;
  else if (system.substring(0, 10) == "Android") return <SiAndroid />;
  else return <GrSystem />;
}

export default getSystemIcon;
