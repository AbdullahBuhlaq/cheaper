import { PiHandWaving } from "react-icons/pi";
import { GiOpenTreasureChest } from "react-icons/gi";
import { FcAbout, FcContacts, FcServices, FcHome, FcBusinessman, FcTimeline, FcInspection, FcDisclaimer, FcPaid, FcBriefcase, FcConferenceCall, FcShop } from "react-icons/fc";

const generalTabs = [
  { name: "مرحبا", value: "main", icon: <PiHandWaving /> },
  { name: "من نحن", value: "aboutUs", icon: <FcAbout /> },
  { name: "الخدمات", value: "services", icon: <FcServices /> },
  { name: "التواصل", value: "contactUs", icon: <FcContacts /> },
];

export const adminTabs = [
  { name: "الرئيسية", value: "home", icon: <FcHome /> },
  { name: "الشخصية", value: "profile", icon: <FcBusinessman /> },
  { name: "الأصناف", value: "categories", icon: <FcTimeline /> },
  { name: "الأدوار", value: "roles", icon: <FcInspection /> },
  { name: "الحظورات", value: "blocks", icon: <FcDisclaimer /> },
  { name: "الباقات", value: "packs", icon: <FcPaid /> },
  { name: "الموظفين", value: "employees", icon: <FcBriefcase /> },
  { name: "المستخدمين", value: "users", icon: <FcConferenceCall /> },
  { name: "المحلات", value: "stores", icon: <FcShop /> },
];
export const pendingShopkeeperTabs = [{ name: "الشخصية", value: "profile", icon: <FcBusinessman /> }];
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
