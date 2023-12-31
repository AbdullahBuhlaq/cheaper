import Joi from "joi";
import Filter from "bad-word-ar";
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

  id: {
    "number.empty": 'حقل "المعرف" لا يجب أن يكون فارغًا.',
    "number.integer": 'حقل "المعرف" يجب أن يكون قيمته عدد صحيح.',
    "number.min": 'حقل "المعرف" يجب أن تكون قيمته على الأقل 1.',
    "number.max": 'حقل "المعرف" يجب أن تكون قيمته على الأكثر 10,000,000.',
    "any.required": 'حقل "المعرف" مطلوب.',
  },
  show: {
    "array.empty": 'حقل "العرض" لا يجب أن يكون فارغًا.',
    "array.min": 'حقل "العرض" يجب أن يحتوي على الأقل عنصر واحد.',
    "array.max": 'حقل "العرض" يجب أن يحتوي على الأكثر 150 عنصر.',
    "any.required": 'حقل "العرض" مطلوب.',
  },
  action: {
    "array.empty": 'حقل "الإجراء" لا يجب أن يكون فارغًا.',
    "array.min": 'حقل "الإجراء" يجب أن يحتوي على الأقل عنصر واحد.',
    "array.max": 'حقل "الإجراء" يجب أن يحتوي على الأكثر 150 عنصر.',
    "any.required": 'حقل "الإجراء" مطلوب.',
  },
};
const roleSchema = {
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
  show: Joi.array()
    .items(Joi.string().trim().min(2).max(100))
    .required()
    .messages({ ...messages, ...errorMessages.show }),
  action: Joi.array()
    .items(Joi.string().required().min(2).max(100).trim())
    .required()
    .messages({ ...messages, ...errorMessages.action }),
};

export default roleSchema;
