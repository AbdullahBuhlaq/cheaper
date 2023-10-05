import Joi from "joi";
import messages from "../../../constants/messages";

const changePhoneNumberSchema = {
  password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
  phoneNumber: Joi.string().required().trim().messages(messages).label("رقم الهاتف الجديد"),
};

export default changePhoneNumberSchema;
