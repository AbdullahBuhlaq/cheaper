import { GiOpenTreasureChest } from "react-icons/gi";
import { FcHome, FcBusinessman, FcTimeline, FcInspection, FcDisclaimer, FcPaid, FcBriefcase, FcConferenceCall, FcShop } from "react-icons/fc";

const selectOptions = {
  gender: [
    { name: "ذكر", value: "ذكر" },
    { name: "انثى", value: "انثى" },
  ],
  statePaid: [
    { name: "مدفوع", value: "مدفوع" },
    { name: "غير مدفوع", value: "غير مدفوع" },
  ],
  typeStore: [
    { name: "شغلة", value: "شغلة" },
    { name: "شغلة2", value: "شغلة2" },
  ],
  notificationsType: [
    { name: "مستخدم عادي", value: "users" },
    { name: "صاحب محل", value: "shop" },
  ],
  city: [
    { name: "حلب", value: "حلب" },
    { name: "دمشق", value: "دمشق" },
    { name: "درعا", value: "درعا" },
    { name: "دير الزور", value: "دير الزور" },
    { name: "حماة", value: "حماة" },
    { name: "إدلب", value: "إدلب" },
    { name: "اللاذقية", value: "اللاذقية" },
    { name: "القنيطرة", value: "القنيطرة" },
    { name: "الرقة", value: "الرقة" },
    { name: "حمص", value: "حمص" },
    { name: "الحسكة", value: "الحسكة" },
    { name: "ريف دمشق", value: "ريف دمشق" },
    { name: "طرطوس", value: "طرطوس" },
    { name: "السويداء", value: "السويداء" },
  ],

  roleId: [{ name: ";dslfk", value: "sdf" }],

  // checkWithImageOrNot: {
  //   true: "مع صور حالات",
  //   false: "بدون صور حالات",
  //   "مع صور حالات": true,
  //   "بدون صور حالات": false,
  // },

  checkWithImageOrNot: [
    { name: "مع صور حالات", value: "مع صور حالات" },
    { name: "بدون صور حالات", value: "بدون صور حالات" },
  ],
  blocked: [
    { name: "محظور", value: true },
    { name: "غير محظور", value: false },
  ],
  offerState: [
    { name: "عادي", value: "عادي" },
    { name: "اهداء", value: "تم الاهداء" },
  ],
  typeOffer: [
    { name: "مجاني", value: "مجاني" },
    { name: "مدفوع", value: "مدفوع" },
  ],

  active: [
    { name: "نشط", value: true },
    { name: "غير نشط", value: false },
  ],
  notificaitionActive: [
    { name: "نشط", value: true },
    { name: "غير نشط", value: false },
  ],
  subscribe: [
    { name: "مشترك", value: true },
    { name: "غير مشترك", value: false },
  ],

  spams: ["شعنون", "بشجع الريال", "اسمو رأفت"],

  category: [
    { name: "الأحذية", vlaue: "الأحذية" },
    { name: "مسبح", vlaue: "مسبح" },
    { name: "بقالية", vlaue: "بقالية" },
  ],

  adminShow: [
    { name: "الرئيسية", value: "home", icon: <FcHome /> },
    { name: "الشخصية", value: "profile", icon: <FcBusinessman /> },
    { name: "الأصناف", value: "categories", icon: <FcTimeline /> },
    { name: "الأدوار", value: "roles", icon: <FcInspection /> },
    { name: "الحظورات", value: "blocks", icon: <FcDisclaimer /> },
    { name: "الباقات", value: "packs", icon: <FcPaid /> },
    { name: "الموظفين", value: "employees", icon: <FcBriefcase /> },
    { name: "المستخدمين", value: "users", icon: <FcConferenceCall /> },
    { name: "المحلات", value: "stores", icon: <FcShop /> },
  ],
  userShow: [
    { name: "الشخصية", value: "profile", icon: <FcBusinessman /> },
    { name: "المحل", value: "storeInformation", icon: <FcShop /> },
  ],
  shopkeeperShow: [
    { name: "الشخصية", value: "profile", icon: <FcBusinessman /> },
    { name: "الرئيسية", value: "home", icon: <FcHome /> },
    { name: "العروض", value: "offers", icon: <GiOpenTreasureChest /> },
  ],

  operators: {
    text: [
      { name: "يساوي", value: "equal" },
      { name: "لا يساوي", value: "not equal" },
      { name: "يحتوي", value: "contains" },
    ],
    number: [
      { name: "يساوي", value: "equal" },
      { name: "لا يساوي", value: "not equal" },
      { name: "أكبر من", value: "greater than" },
      { name: "أكبر أو يساوي", value: "greater than or equal" },
      { name: "أقل من", value: "lettle than " },
      { name: "أقل أو يساوي", value: "lettle than or equal" },
    ],
    select: [
      { name: "يساوي", value: "equal" },
      { name: "لا يساوي", value: "not equal" },
    ],
    selectFromObj: [
      { name: "يساوي", value: "equal" },
      { name: "لا يساوي", value: "not equal" },
    ],
    array: [
      { name: "يحتوي", value: "contains" },
      { name: "لا يحتوي", value: "not contains" },
    ],
    date: [
      { name: "يساوي", value: "equal" },
      { name: "لا يساوي", value: "not equal" },
      { name: "قبل", value: "greater than" },
      { name: "بعد", value: "lettle than " },
    ],
    "": [],
  },
};

export default selectOptions;
