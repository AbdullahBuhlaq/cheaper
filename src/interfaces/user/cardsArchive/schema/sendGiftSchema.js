import Joi from "joi";
import Filter from "bad-word-ar";

const filterAr = new Filter("ar");
const filterEn = new Filter("en");
let message = "بعض الحقول تحتوي على كلمات نابية، الرجاء التقيد باداب النص";
const errorMessages = {
  id: {
    "number.empty": 'حقل "المعرف" لا يجب أن يكون فارغًا.',
    "number.integer": 'حقل "المعرف" يجب أن يكون قيمته عدد صحيح.',
    "number.min": 'حقل "المعرف" يجب أن تكون قيمته على الأقل 1.',
    "number.max": 'حقل "المعرف" يجب أن تكون قيمته على الأكثر 10,000,000.',
    "any.required": 'حقل "المعرف" مطلوب.',
  },
  username: {
    "string.empty": 'حقل "اسم المستخدم" لا يجب أن يكون فارغًا.',
    "string.pattern.base": 'حقل "اسم المستخدم" يجب أن يحتوي على أحرف وأرقام فقط.',
    "string.min": 'حقل "اسم المستخدم" يجب أن يحتوي على الأقل 3 أحرف.',
    "string.max": 'حقل "اسم المستخدم" يجب أن يحتوي على الأكثر 30 حرفًا.',
    "any.required": 'حقل "اسم المستخدم" مطلوب.',
    "any.custom": message,
  },
  size: {
    "number.base": 'حقل "الحجم" يجب أن يكون رقمًا.',
    "number.integer": 'حقل "الحجم" يجب أن يكون رقمًا صحيحًا.',
    "number.min": 'حقل "الحجم" يجب أن يكون على الأقل 1.',
    "number.max": 'حقل "الحجم" يجب أن يكون أقل من أو يساوي 1000.',
    "any.required": 'حقل "الحجم" مطلوب.',
  },
  search: {
    "string.base": 'حقل "search" يجب أن يكون سلسلة نصية.',
    "any.custom": message,
    "number.max": 'حقل "search" يجب أن يكون أقل من أو يساوي 200.',
  },
  page: {
    "number.base": 'حقل "الصفحة" يجب أن يكون رقمًا.',
    "number.integer": 'حقل "الصفحة" يجب أن يكون رقمًا صحيحًا.',
    "number.min": 'حقل "الصفحة" يجب أن يكون على الأقل 1.',
    "number.max": 'حقل "الصفحة" يجب أن يكون أقل من أو يساوي 10000.',
    "any.required": 'حقل "الصفحة" مطلوب.',
  },
  reason: {
    "string.empty": 'حقل "السبب" لا يجب أن يكون فارغًا.',
    "string.min": 'حقل "السبب" يجب أن يحتوي على الأقل حرف واحد.',
    "string.max": 'حقل "السبب" يجب أن يحتوي على الأكثر 200 حرف.',
    "any.required": 'حقل "السبب" مطلوب.',
  },
  evaluate: {
    "number.empty": 'حقل "التقيم" لا يجب أن يكون فارغًا.',
    "number.integer": 'حقل "التقيم" يجب أن يكون قيمته عدد صحيح.',
    "number.min": 'حقل "التقيم" يجب أن تكون قيمته على الأقل 1.',
    "number.max": 'حقل "التقيم" يجب أن تكون قيمته على الأكثر 10.',
    "any.required": 'حقل "التقيم" مطلوب.',
  },
  type: {
    "any.only": 'حقل "الجنس" يجب أن يكون spam أو evaluate',
    "any.required": 'حقل "الجنس" مطلوب.',
  },
  typeOffer: {
    "any.only": 'حقل "الجنس" يجب أن يكون مجاني او مدفوع ',
    "any.required": 'حقل "نوع العرض" مطلوب.',
  },
  state: {
    "any.only": 'حقل "الجنس" يجب أن يكون عادي , تم الاهداء ',
    "any.required": 'حقل "الحالة" مطلوب.',
  },
};

const sendGiftSchema = {
  username: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
    .min(3)
    .max(30)
    .required()
    .messages(errorMessages.username),
};

export default sendGiftSchema;
