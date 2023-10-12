import Joi from "joi";

const sendCodeSchema = {
  code: Joi.string()
    .pattern(/(\d{6})$/)
    .trim()
    .required(),
};

export default sendCodeSchema;
