import Joi from "joi";
import messages from "../../../../constants/messages";

const roleSchema = {
  name: Joi.string().required().trim().messages(messages).label("اسم الدور"),
  show: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("صلاحيات القراءة"),
  action: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("صلاحيات التعديل"),
};

export default roleSchema;
