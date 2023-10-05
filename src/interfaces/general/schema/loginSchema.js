import Joi from "joi";
import messages from "../../../constants/messages";

const loginSchema = {
  username: Joi.string()
    .trim()
    .pattern(/[a-zA-Z]+[a-zA-Z0-9\_\.]*$/)
    .min(3)
    .max(30)
    .required()
    .messages({ ...messages, "string.pattern.base": "{{#label}} must contain just numbers and letters" })
    .label("اسم المستخدم"),
  password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
};

export default loginSchema;
