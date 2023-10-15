import Joi from "joi";
import messages from "../../../../../constants/messages";

const errorMessages = {
  discount: {
    "number.empty": 'حقل "الخصم" لا يجب أن يكون فارغًا.',
    "number.integer": 'حقل "الخصم" يجب أن يكون قيمته عدد صحيح.',
    "number.min": `حقل "الخصم" يجب أن تكون قيمته على الأقل ${15}`,
    "any.required": 'حقل "المعرف" مطلوب.',
  },
};
export const newPackSchema = {
  discount: Joi.number()
    .integer()
    .required()
    .min(15)
    .max(100)
    .messages({ ...messages, ...errorMessages.discount }),
};

export default newPackSchema;
