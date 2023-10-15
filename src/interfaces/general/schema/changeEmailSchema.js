import Joi from "joi";
import Filter from "bad-word-ar";
import messages from "../../../constants/messages";

const filterAr = new Filter("ar");
const filterEn = new Filter("en");
let message = "بعض الحقول تحتوي على كلمات نابية، الرجاء التقيد باداب النص";

const errorMessages = {
  email: {
    "string.empty": 'حقل "البريد الإلكتروني" لا يجب أن يكون فارغًا.',
    "string.pattern.base": 'حقل "البريد الإلكتروني" يجب أن يكون بتنسيق صحيح (example@gmail.com).',
    "any.required": 'حقل "البريد الإلكتروني" مطلوب.',
  },
  password: {
    "string.empty": 'حقل "كلمة المرور" لا يجب أن يكون فارغًا.',
    "string.min": 'حقل "كلمة المرور" يجب أن تحتوي على الأقل 8 أحرف.',
    "string.max": 'حقل "كلمة المرور" يجب أن تحتوي على الأكثر 50 حرفًا.',
    "any.required": 'حقل "كلمة المرور" مطلوب.',
  },
};
const changeEmailSchema = {
  password: Joi.string()
    .required()
    .min(8)
    .max(50)
    .custom((value, helpers) => {
      if (filterAr.check(value) || filterEn.check(value)) return helpers.message(message);
      else return value;
    })
    .messages({ ...messages, ...errorMessages.password }),
  newEmail: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z0-9]+[a-zA-Z0-9._]*@gmail\.com$/)
    .messages({ ...messages, ...errorMessages.email }),
};

export default changeEmailSchema;
