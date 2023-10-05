import Joi from "joi";
import messages from "../../../../constants/messages";

const employeeSchema = {
  name: Joi.string().required().min(2).max(50).trim().messages(messages).label("الاسم"),
  gender: Joi.string().required().messages(messages).label("الجنس"),
  email: Joi.string()
    .trim()
    .required()
    .pattern(/[a-zA-Z0-9]+[a-zA-Z0-9\_\.]*(@gmail\.com)$/)
    .messages(messages)
    .label("البريد الإلكتروني"),
  phoneNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^(09)(\d{8})$/)
    .messages(messages)
    .label("رقم الموبايل"),
  username: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
    .min(3)
    .max(30)
    .required()
    .messages(messages)
    .label("اسم المستخدم"),
  password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة المرور"),
  roleId: Joi.number().required().messages(messages).label("الدور"),
};

export default employeeSchema;
