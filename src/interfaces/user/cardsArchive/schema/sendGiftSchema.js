import Joi from "joi";
import Filter from "bad-word-ar";
import messages from "../../../../constants/messages";

const filterAr = new Filter("ar");
const filterEn = new Filter("en");
let message = "بعض الحقول تحتوي على كلمات نابية، الرجاء التقيد باداب النص";
const errorMessages = {
  username: {
    "string.empty": 'حقل "اسم المستخدم" لا يجب أن يكون فارغًا.',
    "string.pattern.base": 'حقل "اسم المستخدم" يجب أن يحتوي على أحرف وأرقام فقط.',
    "string.min": 'حقل "اسم المستخدم" يجب أن يحتوي على الأقل 3 أحرف.',
    "string.max": 'حقل "اسم المستخدم" يجب أن يحتوي على الأكثر 30 حرفًا.',
    "any.required": 'حقل "اسم المستخدم" مطلوب.',
    "any.custom": message,
  },
};

const sendGiftSchema = {
  username: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
    .min(3)
    .max(30)
    .required()
    .messages({ ...messages, ...errorMessages.username }),
};

export default sendGiftSchema;
