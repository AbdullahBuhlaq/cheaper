import Joi from "joi";
import Filter from "bad-word-ar";
import messages from "../../../constants/messages";

const filterAr = new Filter("ar");
const filterEn = new Filter("en");
let message = "بعض الحقول تحتوي على كلمات نابية، الرجاء التقيد باداب النص";
const errorMessages = {
  phoneNumber: {
    "string.empty": 'حقل "رقم الهاتف" لا يجب أن يكون فارغًا.',
    "string.pattern.base": 'حقل "رقم الهاتف" يجب أن يكون بتنسيق صحيح (09xxxxxxxx).',
    "any.required": 'حقل "رقم الهاتف" مطلوب.',
  },

  password: {
    "string.empty": 'حقل "كلمة المرور" لا يجب أن يكون فارغًا.',
    "string.min": 'حقل "كلمة المرور" يجب أن تحتوي على الأقل 8 أحرف.',
    "string.max": 'حقل "كلمة المرور" يجب أن تحتوي على الأكثر 50 حرفًا.',
    "any.required": 'حقل "كلمة المرور" مطلوب.',
  },
};
const changePhoneNumberSchema = {
  phoneNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^(09)(\d{8})$/)
    .messages({ ...messages, ...errorMessages.phoneNumber }),
  password: Joi.string()
    .required()
    .min(8)
    .max(50)
    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value)) return helpers.message(message);
      else return value;
    })
    .messages({ ...messages, ...errorMessages.password }),
};

export default changePhoneNumberSchema;
