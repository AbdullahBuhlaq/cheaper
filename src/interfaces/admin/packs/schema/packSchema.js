import Joi from "joi";
import messages from "../../../../constants/messages";

const packSchema = {
  name: Joi.string().required().trim().messages(messages).label("اسم الباقة"),
  duration: Joi.number().required().messages(messages).label("المدة"),
  price: Joi.number().required().messages(messages).label("السعر"),
};

export default packSchema;
