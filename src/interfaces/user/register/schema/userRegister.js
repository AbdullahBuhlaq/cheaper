import Joi from "joi";
import messages from "../../../../constants/messages";

const userSchema = {
  name: Joi.string().required().min(2).max(50).trim().messages(messages).label("الاسم"),
  gender: Joi.string().required().messages(messages).label("الجنس"),
  category: Joi.array().items(Joi.string().trim().min(1).max(50)).min(3).required().messages(messages).label("أصناف المحلات المفضلة"),
  phoneNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^(09)(\d{8})$/)
    .messages(messages)
    .label("رقم الهاتف"),
  birthday: Joi.date().required().messages(messages).label("تاريخ الميلاد"),
  username: Joi.string()
    .trim()
    .pattern(/[a-zA-Z]+[a-zA-Z0-9\_\.]*$/)
    .min(3)
    .max(30)
    .required()
    .messages(messages)
    .label("اسم المستخدم"),
  password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة المرور"),
};

export default userSchema;
