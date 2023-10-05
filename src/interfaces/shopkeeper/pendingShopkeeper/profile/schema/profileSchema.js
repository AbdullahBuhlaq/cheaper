import Joi from "joi";
let message = "بعض الحقول تحتوي على كلمات نابية، الرجاء التقيد باداب النص";

const errorMessages = {
  name: {
    "string.empty": 'حقل "الاسم" لا يجب أن يكون فارغًا.',
    "string.min": 'حقل "الاسم" يجب أن يحتوي على الأقل حرفين.',
    "string.max": 'حقل "الاسم" يجب أن يحتوي على الأكثر 50 حرفًا.',
    "any.required": 'حقل "الاسم" مطلوب.',
    "any.custom": message,
  },
  gender: {
    "any.only": 'حقل "الجنس" يجب أن يكون ذكرًا أو أنثى.',
    "any.required": 'حقل "الجنس" مطلوب.',
  },
  email: {
    "string.empty": 'حقل "البريد الإلكتروني" لا يجب أن يكون فارغًا.',
    "string.pattern.base": 'حقل "البريد الإلكتروني" يجب أن يكون بتنسيق صحيح (example@gmail.com).',
    "any.required": 'حقل "البريد الإلكتروني" مطلوب.',
  },
  phoneNumber: {
    "string.empty": 'حقل "رقم الهاتف" لا يجب أن يكون فارغًا.',
    "string.pattern.base": 'حقل "رقم الهاتف" يجب أن يكون بتنسيق صحيح (09xxxxxxxx).',
    "any.required": 'حقل "رقم الهاتف" مطلوب.',
  },
  username: {
    "string.empty": 'حقل "اسم المستخدم" لا يجب أن يكون فارغًا.',
    "string.pattern.base": 'حقل "اسم المستخدم" يجب أن يحتوي على أحرف وأرقام فقط.',
    "string.min": 'حقل "اسم المستخدم" يجب أن يحتوي على الأقل 3 أحرف.',
    "string.max": 'حقل "اسم المستخدم" يجب أن يحتوي على الأكثر 30 حرفًا.',
    "any.required": 'حقل "اسم المستخدم" مطلوب.',
    "any.custom": message,
  },
  password: {
    "string.empty": 'حقل "كلمة المرور" لا يجب أن يكون فارغًا.',
    "string.min": 'حقل "كلمة المرور" يجب أن تحتوي على الأقل 8 أحرف.',
    "string.max": 'حقل "كلمة المرور" يجب أن تحتوي على الأكثر 50 حرفًا.',
    "any.required": 'حقل "كلمة المرور" مطلوب.',
  },
  birthday: {
    "date.base": 'حقل "birthday" يجب أن يكون تاريخًا.',
    "date.format": 'حقل "birthday" يجب أن يكون بتنسيق تاريخ صالح.',
    "date.max": 'حقل "birthday" يجب أن يكون تاريخًا قبل اليوم.',
    "date.min": 'حقل "birthday" يجب أن يكون تاريخًا بعد "1970-01-01".',
    "any.required": 'حقل "birthday" مطلوب.',
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
  type: {
    "boolean.base": 'حقل "النوع" يجب أن يكون منطقيًا.',
    "any.required": 'حقل "النوع" مطلوب.',
  },
  category: {
    "string.base": 'حقل "الفئة" يجب أن يكون سلسلة نصية.',
    "string.custom": message,
    "any.required": 'حقل "الفئة" مطلوب.',
  },

  search: {
    "string.base": 'حقل "search" يجب أن يكون سلسلة نصية.',
    "any.custom": message,
    "number.max": 'حقل "search" يجب أن يكون أقل من أو يساوي 200.',
  },
  id: {
    "number.base": 'حقل "المعرف" يجب أن يكون رقمًا.',
    "number.integer": 'حقل "المعرف" يجب أن يكون رقمًا صحيحًا.',
    "number.max": 'حقل "المعرف" يجب أن يكون أقل من أو يساوي  يجب أن يكون أقل من أو يساوي 1 000 000.',
    "any.required": 'حقل "المعرف" مطلوب.',
  },
  active: {
    "boolean.base": 'حقل "النوع" يجب أن يكون منطقيًا.',
    "any.required": 'حقل "النوع" مطلوب.',
  },
};

const userSchema = {
  name: Joi.string().required().min(2).max(50).trim().messages(errorMessages.name),
  gender: Joi.string().required().messages(errorMessages.gender),
  birthday: Joi.date().required().messages(errorMessages.birthday),
  username: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
    .min(3)
    .max(30)
    .required()
    .messages(errorMessages.username),
  avatar: Joi.string().empty(Joi.allow(null)),
};

export default userSchema;
