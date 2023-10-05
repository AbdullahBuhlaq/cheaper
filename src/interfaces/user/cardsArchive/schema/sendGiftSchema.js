import Joi from "joi";
import messages from "../../../../constants/messages";

const sendGiftSchema = {
  username: Joi.string()
    .trim()
    .pattern(/[a-zA-Z]+[a-zA-Z0-9\_\.]*$/)
    .min(3)
    .max(30)
    .required()
    .messages(messages)
    .label("اسم المستخدم"),
};

export default sendGiftSchema;
