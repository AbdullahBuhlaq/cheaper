import Joi from "joi";
import Filter from "bad-word-ar";
import moment from "moment/moment.js";
import messages from "../../../../constants/messages";

const filterAr = new Filter("ar");
const filterEn = new Filter("en");
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
    "string.pattern.base":
      'حقل "البريد الإلكتروني" يجب أن يكون بتنسيق صحيح (example@gmail.com).',
    "any.required": 'حقل "البريد الإلكتروني" مطلوب.',
  },
  phoneNumber: {
    "string.empty": 'حقل "رقم الهاتف" لا يجب أن يكون فارغًا.',
    "string.pattern.base":
      'حقل "رقم الهاتف" يجب أن يكون بتنسيق صحيح (09xxxxxxxx).',
    "any.required": 'حقل "رقم الهاتف" مطلوب.',
  },
  username: {
    "string.empty": 'حقل "اسم المستخدم" لا يجب أن يكون فارغًا.',
    "string.pattern.base":
      'حقل "اسم المستخدم" يجب أن يحتوي على أحرف وأرقام فقط.',
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
    "date.base": 'حقل "تاريخ الميلاد" يجب أن يكون تاريخًا.',
    "date.format": 'حقل "تاريخ الميلاد" يجب أن يكون بتنسيق تاريخ صالح.',
    "date.max": 'حقل "تاريخ الميلاد" يجب أن يكون تاريخًا قبل اليوم.',
    "date.min": 'حقل "تاريخ الميلاد" يجب أن يكون تاريخًا بعد "1930-01-01".',
    "any.required": 'حقل "تاريخ الميلاد" مطلوب.',
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
    "any.custom": message,
  },
  locationText: {
    "string.min": 'حقل "نص الموقع" يجب أن يحتوي على الأقل حرف واحد.',
    "string.max": 'حقل "نص الموقع" يجب أن يحتوي على الأكثر 200 حرفًا.',
  },
  city: {
    "string.min": 'حقل "المدينة" يجب أن يحتوي على الأقل حرف واحد.',
    "string.max": 'حقل "المدينة" يجب أن يحتوي على الأكثر 50 حرفًا.',
    "any.required": 'حقل "المدينة" مطلوب.',
    "any.custom": message,
  },
  id: {
    "number.empty": 'حقل "المعرف" لا يجب أن يكون فارغًا.',
    "number.integer": 'حقل "المعرف" يجب أن يكون قيمته عدد صحيح.',
    "number.min": 'حقل "المعرف" يجب أن تكون قيمته على الأقل 1.',
    "number.max": 'حقل "المعرف" يجب أن تكون قيمته على الأكثر 10,000,000.',
    "any.required": 'حقل "المعرف" مطلوب.',
  },
};

const shopkeeperSchema = {
  name: Joi.string()
    .required()
    .min(2)
    .max(50)
    .trim()
    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value))
        return helpers.message(message);
      else return value;
    })
    .messages({ ...messages, ...errorMessages.name }),
  gender: Joi.string()
    .required()
    .messages({ ...messages, ...errorMessages.gender }),
  birthday: Joi.date()
    .required()
    .max(moment())
    .min(moment("1930-01-01"))
    .messages({ ...messages, ...errorMessages.birthday }),

  email: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z0-9]+[a-zA-Z0-9._]*@gmail\.com$/)
    .messages({ ...messages, ...errorMessages.email }),

  phoneNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^(09)(\d{8})$/)
    .messages({ ...messages, ...errorMessages.phoneNumber }),

  username: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
    .min(3)
    .max(30)
    .required()
    .messages({ ...messages, ...errorMessages.username }),
  password: Joi.string()

    .min(8)
    .max(50)
    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value))
        return helpers.message(message);
      else return value;
    })
    .messages({ ...messages, ...errorMessages.password }),

  locationText: Joi.string()
    .min(1)
    .max(200)
    .allow(null)
    .messages({ ...messages, ...errorMessages.locationText })

    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value))
        return helpers.message(message);
      else return value;
    }),
  nameStore: Joi.string()
    .required()
    .min(2)
    .max(50)
    .trim()
    .messages({ ...messages, ...errorMessages.name })
    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value))
        return helpers.message(message);
      else return value;
    }),

  longitude: Joi.number()
    .required()
    .messages({ ...messages, ...errorMessages.longitude }),
  latitude: Joi.number()
    .required()
    .messages({ ...messages, ...errorMessages.latitude }),

  fromHour: Joi.string()
    .pattern(
      /^(([0-9]{1})|([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1}))(([:]{1})?)(([0-5]{1}[0-9]?)?)$/
    )
    .required(),
  toHour: Joi.string()
    .pattern(
      /^(([0-9]{1})|([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1}))(([:]{1})?)(([0-5]{1}[0-9]?)?)$/
    )
    .required(),

  category: Joi.string()
    .max(50)
    .required()
    .messages({ ...messages, ...errorMessages.category })

    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value))
        return helpers.message(message);
      else return value;
    }),
};

export default shopkeeperSchema;
