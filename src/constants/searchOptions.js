const searchOptions = {
  categories: { name: { type: "text", operator: "contains", value: null, name: "الاسم" }, user: { type: "number", operator: null, value: null, name: "المستخدمين" }, store: { type: "number", operator: null, value: null, name: "المتاجر" }, offerTaken: { type: "number", operator: null, value: null, name: "العروض" } },
  roles: { name: { type: "text", operator: "contains", value: null, name: "الاسم" } },
  blocks: { reason: { type: "text", operator: "contains", value: null, name: "الاسم" } },

  employees: {
    name: { type: "text", operator: "contains", value: null, name: "الاسم" },
    phoneNumber: { type: "text", operator: null, value: null, name: "رقم الهاتف" },
    roleId: { type: "selectFromObj", operator: null, value: null, name: "الدور", valueName: "id", showName: "name" },
    username: { type: "text", operator: null, value: null, name: "اسم المستخدم" },
    gender: { type: "select", operator: null, value: null, name: "الجنس" },
    email: { type: "text", operator: null, value: null, name: "البريد الإلكتروني" },
  },
  packs: {
    name: { type: "text", operator: "contains", value: null, name: "الاسم" },
    duration: { type: "number", operator: null, value: null, name: "المدة" },
    price: { type: "number", operator: null, value: null, name: "السعر" },
  },
};

export default searchOptions;
