import Joi from "joi";

const sendCodeSchema = {
  code: Joi.string()
    .pattern(/(\d{6})$/)
    .trim()
    .required()
    .messages({ "string.pattern.base": "يجب أن يحتوي 6 أرقام" }),
};

export default sendCodeSchema;
