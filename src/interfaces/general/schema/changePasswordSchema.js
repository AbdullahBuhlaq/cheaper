import Joi from "joi";
import messages from "../../../constants/messages";

const changePasswordSchema = {
  password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
  newPassword: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر الجديدة"),
};

export default changePasswordSchema;
