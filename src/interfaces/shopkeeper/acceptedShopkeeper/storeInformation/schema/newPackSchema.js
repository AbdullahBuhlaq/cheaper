import Joi from "joi";
const errorMessages = {
  name: {
    "string.empty": 'حقل "الاسم" لا يجب أن يكون فارغًا.',
    "string.min": 'حقل "الاسم" يجب أن يحتوي على الأقل حرفين.',
    "string.max": 'حقل "الاسم" يجب أن يحتوي على الأكثر 60 حرفًا.',
    "any.required": 'حقل "الاسم" مطلوب.',
  },
  duration: {
    "number.empty": 'حقل "المدة" لا يجب أن يكون فارغًا.',
    "number.min": 'حقل "المدة" يجب أن تكون قيمته على الأقل 1.',
    "number.max": 'حقل "المدة" يجب أن تكون قيمته على الأكثر 10,000.',
    "any.required": 'حقل "المدة" مطلوب.',
  },
  price: {
    "number.empty": 'حقل "السعر" لا يجب أن يكون فارغًا.',
    "number.integer": 'حقل "السعر" يجب أن يكون قيمته عدد صحيح.',
    "number.min": 'حقل "السعر" يجب أن تكون قيمته على الأقل 0.',
    "any.required": 'حقل "السعر" مطلوب.',
  },
  id: {
    "number.empty": 'حقل "المعرف" لا يجب أن يكون فارغًا.',
    "number.integer": 'حقل "المعرف" يجب أن يكون قيمته عدد صحيح.',
    "number.min": 'حقل "المعرف" يجب أن تكون قيمته على الأقل 1.',
    "number.max": 'حقل "المعرف" يجب أن تكون قيمته على الأكثر 10,000,000.',
    "any.required": 'حقل "المعرف" مطلوب.',
  },
  packId: {
    "number.empty": 'حقل "معرف " لا يجب أن يكون فارغًا.',
    "number.integer": 'حقل "معرف " يجب أن يكون قيمته عدد صحيح.',
    "number.min": 'حقل "معرف " يجب أن تكون قيمته على الأقل 1.',
    "number.max": 'حقل "معرف " يجب أن تكون قيمته على الأكثر 10,000,000.',
    "any.required": 'حقل "معرف " مطلوب.',
  },
  discount: {
    "number.empty": 'حقل "الخصم" لا يجب أن يكون فارغًا.',
    "number.integer": 'حقل "الخصم" يجب أن يكون قيمته عدد صحيح.',
    "number.min": `حقل "الخصم" يجب أن تكون قيمته على الأقل ${15}`,
    "any.required": 'حقل "المعرف" مطلوب.',
  },
};
export const newPackSchema = {
  discount: Joi.number().integer().required().min(15).max(100).messages(errorMessages.discount),
};

export default newPackSchema;
