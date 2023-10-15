import Joi from "joi";
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
  longitude: {
    "number.required": 'حقل "خط الطول" مطلوب.',
  },
  latitude: {
    "number.required": 'حقل "خط العرض" مطلوب.',
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
};

const storeInformationSchema = {
  nameStore: Joi.string()
    .required()
    .min(2)
    .max(50)
    .trim()
    .messages({ ...messages, ...errorMessages.name })
    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value)) return helpers.message(message);
      else return value;
    }),
  longitude: Joi.number()
    .required()
    .messages({ ...messages, ...errorMessages.longitude }),
  latitude: Joi.number()
    .required()
    .messages({ ...messages, ...errorMessages.latitude }),
  fromHour: Joi.string()
    .pattern(/^(([0-9]{1})|([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1}))(([:]{1})?)(([0-5]{1}[0-9]?)?)$/)
    .required(),
  toHour: Joi.string()
    .pattern(/^(([0-9]{1})|([0-1]{1}[0-9]{1})|([2]{1}[0-3]{1}))(([:]{1})?)(([0-5]{1}[0-9]?)?)$/)
    .required(),
  category: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({ ...messages, ...errorMessages.category })

    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value)) return helpers.message(message);
      else return value;
    }),
  locationText: Joi.string()
    .min(1)
    .max(200)
    .allow(null)
    .messages({ ...messages, ...errorMessages.locationText })
    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value)) return helpers.message(message);
      else return value;
    }),
  city: Joi.string()
    .min(1)
    .max(50)
    .required()
    .messages({ ...messages, ...errorMessages.city })
    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value)) return helpers.message(message);
      else return value;
    }),
};

export default storeInformationSchema;
