import Joi from "joi";

const errorMessages = {
  name: {
    "string.empty": 'حقل "الاسم" لا يجب أن يكون فارغًا.',
    "string.min": 'حقل "الاسم" يجب أن يحتوي على الأقل حرفين.',
    "string.max": 'حقل "الاسم" يجب أن يحتوي على الأكثر 50 حرفًا.',
    "any.required": 'حقل "الاسم" مطلوب.',
  },
  longitude: {
    "number.required": 'حقل "خط الطول" مطلوب.',
  },
  latitude: {
    "number.required": 'حقل "خط العرض" مطلوب.',
  },
  fromHour: {
    "number.integer": 'حقل "الساعة من" يجب أن يكون عدد صحيح.',
    "number.required": 'حقل "الساعة من" مطلوب.',
    "number.min": 'حقل "الساعة من" يجب أن تكون بين 1 و 12.',
    "number.max": 'حقل "الساعة من" يجب أن تكون بين 1 و 12.',
  },
  toHour: {
    "number.integer": 'حقل "الساعة إلى" يجب أن يكون عدد صحيح.',
    "number.required": 'حقل "الساعة إلى" مطلوب.',
    "number.min": 'حقل "الساعة إلى" يجب أن تكون بين 1 و 12.',
    "number.max": 'حقل "الساعة إلى" يجب أن تكون بين 1 و 12.',
  },
  category: {
    "string.min": 'حقل "الفئة" يجب أن يحتوي على الأقل حرفين.',
    "string.max": 'حقل "الفئة" يجب أن يحتوي على الأكثر 50 حرفًا.',
    "any.required": 'حقل "الفئة" مطلوب.',
  },
  avatar_store: {
    "string.empty": 'حقل "صورة المتجر" لا يجب أن يكون فارغًا.',
  },
  locationText: {
    "string.min": 'حقل "نص الموقع" يجب أن يحتوي على الأقل حرف واحد.',
    "string.max": 'حقل "نص الموقع" يجب أن يحتوي على الأكثر 200 حرفًا.',
  },
  search: {
    "string.base": 'حقل "search" يجب أن يكون سلسلة نصية.',
    "number.max": 'حقل "search" يجب أن يكون أقل من أو يساوي 200.',
  },
  size: {
    "number.base": 'حقل "الحجم" يجب أن يكون رقمًا.',
    "number.integer": 'حقل "الحجم" يجب أن يكون رقمًا صحيحًا.',
    "number.min": 'حقل "الحجم" يجب أن يكون على الأقل 1.',
    "number.max": 'حقل "الحجم" يجب أن يكون أقل من أو يساوي 1000.',
    "any.required": 'حقل "الحجم" مطلوب.',
  },
  page: {
    "number.base": 'حقل "الصفحة" يجب أن يكون رقمًا.',
    "number.integer": 'حقل "الصفحة" يجب أن يكون رقمًا صحيحًا.',
    "number.min": 'حقل "الصفحة" يجب أن يكون على الأقل 1.',
    "number.max": 'حقل "الصفحة" يجب أن يكون أقل من أو يساوي 10000.',
    "any.required": 'حقل "الصفحة" مطلوب.',
  },
  city: {
    "string.min": 'حقل "المدينة" يجب أن يحتوي على الأقل حرف واحد.',
    "string.max": 'حقل "المدينة" يجب أن يحتوي على الأكثر 50 حرفًا.',
    "any.required": 'حقل "المدينة" مطلوب.',
  },
  avatar: {
    "string.empty": 'حقل "الصورة" لا يجب أن يكون فارغًا.',
  },
  id: {
    "number.empty": 'حقل "المعرف" لا يجب أن يكون فارغًا.',
    "number.integer": 'حقل "المعرف" يجب أن يكون قيمته عدد صحيح.',
    "number.min": 'حقل "المعرف" يجب أن تكون قيمته على الأقل 1.',
    "number.max": 'حقل "المعرف" يجب أن تكون قيمته على الأكثر 10,000,000.',
    "any.required": 'حقل "المعرف" مطلوب.',
  },
  users: {
    statePaid: {
      "string.base": 'حقل "statePaid" يجب أن يكون سلسلة نصية.',
      "any.only": 'قيمة "statePaid" غير صالحة.',
      "any.required": 'حقل "statePaid" مطلوب.',
    },
    type: {
      "string.base": 'حقل "type" يجب أن يكون سلسلة نصية.',
      "any.only": 'قيمة "type" غير صالحة.',
      "any.required": 'حقل "type" مطلوب.',
    },
  },
};

const storeInformationSchema = {
  nameStore: Joi.string().required().min(2).max(50).trim().messages(errorMessages.name),
  longitude: Joi.number().required().messages(errorMessages.longitude),
  latitude: Joi.number().required().messages(errorMessages.latitude),
  fromHour: Joi.string()
    .pattern(/^(0[1-9]|1[0-2]):[0-5][0-9]$/)
    .required()
    .messages(errorMessages.fromHour),
  toHour: Joi.string()
    .pattern(/^(0[1-9]|1[0-2]):[0-5][0-9]$/)
    .required()
    .messages(errorMessages.toHour),
  category: Joi.string().min(2).max(50).required().messages(errorMessages.category),
  locationText: Joi.string().min(1).max(200).allow(null).messages(errorMessages.locationText),
  city: Joi.string().min(1).max(50).required().messages(errorMessages.city),

  avatar: Joi.string().empty(Joi.allow(null)),
};

export default storeInformationSchema;
