import { PiHandWaving } from "react-icons/pi";
import { GiOpenTreasureChest } from "react-icons/gi";
import {
  FcAbout,
  FcContacts,
  FcServices,
  FcHome,
  FcBusinessman,
  FcTimeline,
  FcInspection,
  FcDisclaimer,
  FcPaid,
  FcBriefcase,
  FcConferenceCall,
  FcShop,
} from "react-icons/fc";

const generalTabs = [
  {
    name: "Cheaper",
    value: "main",
    icon: (
      <div style={{ width: "35px", height: "35px", objectFit: "cover" }}>
        <img src="images/cheaper_icon.png" style={{ width: "100%" }} />
      </div>
    ),
  },
  // { name: "من نحن", value: "aboutUs", icon: <FcAbout /> },
  // { name: "الخدمات", value: "services", icon: <FcServices /> },
  // { name: "التواصل", value: "contactUs", icon: <FcContacts /> },
];

export const adminTabs = [
  { name: "الرئيسية", value: "home", icon: <FcHome /> },
  { name: "الشخصية", value: "profile", icon: <FcBusinessman /> },
  { name: "المحلات", value: "stores", icon: <FcShop /> },
  { name: "المستخدمين", value: "users", icon: <FcConferenceCall /> },
  { name: "الباقات", value: "packs", icon: <FcPaid /> },
  { name: "الأصناف", value: "categories", icon: <FcTimeline /> },
  { name: "الموظفين", value: "employees", icon: <FcBriefcase /> },
  { name: "الحظورات", value: "blocks", icon: <FcDisclaimer /> },
  { name: "الأدوار", value: "roles", icon: <FcInspection /> },
];
export const pendingShopkeeperTabs = [
  { name: "الشخصية", value: "profile", icon: <FcBusinessman /> },
];
export const acceptedShopkeeperTabs = [
  { name: "الشخصية", value: "profile", icon: <FcBusinessman /> },
  { name: "المحل", value: "storeInformation", icon: <FcShop /> },
];
export const userTabs = [
  { name: "الشخصية", value: "profile", icon: <FcBusinessman /> },
  { name: "الرئيسية", value: "home", icon: <FcHome /> },
  { name: "العروض", value: "offers", icon: <GiOpenTreasureChest /> },
];

export default generalTabs;
