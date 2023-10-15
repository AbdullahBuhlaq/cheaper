import Joi from "joi";
import moment from "moment";
import Filter from "bad-word-ar";
import messages from "../../../../../constants/messages";

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

  birthday: {
    "date.base": 'حقل "تاريخ الميلاد" يجب أن يكون تاريخًا.',
    "date.format": 'حقل "تاريخ الميلاد" يجب أن يكون بتنسيق تاريخ صالح.',
    "date.max": 'حقل "تاريخ الميلاد" يجب أن يكون تاريخًا قبل اليوم.',
    "date.min": 'حقل "تاريخ الميلاد" يجب أن يكون تاريخًا بعد "1930-01-01".',
    "any.required": 'حقل "تاريخ الميلاد" مطلوب.',
  },

  category: {
    "string.base": 'حقل "الفئة" يجب أن يكون سلسلة نصية.',
    "string.custom": message,
    "any.required": 'حقل "الفئة" مطلوب.',
  },
};

const profileSchema = {
  name: Joi.string()
    .required()
    .min(2)
    .max(50)
    .trim()
    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value)) return helpers.message(message);
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
  username: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
    .min(3)
    .max(30)
    .required()
    .messages({ ...messages, ...errorMessages.username }),
  phoneNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^(09)(\d{8})$/)
    .messages({ ...messages, ...errorMessages.phoneNumber }),

  category: Joi.array()
    .items(
      Joi.string()
        .trim()
        .max(30)
        .required()
        .custom((value, helpers) => {
          if (filterAr.check(value) || filterEn.check(value)) return helpers.message(message);
          else return value;
        })
        .message({ ...messages, ...errorMessages.category })
    )
    .min(3)
    .required(),
  imageStatus: Joi.string().trim().required(),
};

export default profileSchema;
