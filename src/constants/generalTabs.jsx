import { PiHandWaving } from "react-icons/pi";
import { GiOpenTreasureChest } from "react-icons/gi";
import { FcAbout, FcContacts, FcServices, FcHome, FcBusinessman, FcTimeline, FcInspection, FcDisclaimer, FcPaid, FcBriefcase, FcConferenceCall, FcShop } from "react-icons/fc";

const generalTabs = [
  { name: "Main", value: "main", icon: <PiHandWaving /> },
  { name: "About Us", value: "aboutUs", icon: <FcAbout /> },
  { name: "Services", value: "services", icon: <FcServices /> },
  { name: "Contact", value: "contactUs", icon: <FcContacts /> },
];

export const adminTabs = [
  { name: "Home", value: "home", icon: <FcHome /> },
  { name: "Profile", value: "profile", icon: <FcBusinessman /> },
  { name: "Categories", value: "categories", icon: <FcTimeline /> },
  { name: "Roles", value: "roles", icon: <FcInspection /> },
  { name: "Blocks", value: "blocks", icon: <FcDisclaimer /> },
  { name: "Packs", value: "packs", icon: <FcPaid /> },
  { name: "Employees", value: "employees", icon: <FcBriefcase /> },
  { name: "Users", value: "users", icon: <FcConferenceCall /> },
  { name: "Stores", value: "stores", icon: <FcShop /> },
];
export const pendingShopkeeperTabs = [{ name: "Profile", value: "profile", icon: <FcBusinessman /> }];
export const acceptedShopkeeperTabs = [
  { name: "Profile", value: "profile", icon: <FcBusinessman /> },
  { name: "store", value: "storeInformation", icon: <FcShop /> },
];
export const userTabs = [
  { name: "Profile", value: "profile", icon: <FcBusinessman /> },
  { name: "Home", value: "home", icon: <FcHome /> },
  { name: "Offers", value: "offers", icon: <GiOpenTreasureChest /> },
];

export default generalTabs;
