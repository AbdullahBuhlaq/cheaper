import Joi from "joi";
import messages from "../../../constants/messages";

const changeEmailSchema = {
  password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
  newEmail: Joi.string()
    .required()
    .trim()
    .pattern(/[a-zA-Z0-9\_\.]+(@gmail\.com)$/)
    .messages(messages)
    .label("البريد الإلكتروني الجديد"),
};

export default changeEmailSchema;
