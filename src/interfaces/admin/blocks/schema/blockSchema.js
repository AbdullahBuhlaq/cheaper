import Joi from "joi";
import messages from "../../../../constants/messages";

const blockSchema = {
  reason: Joi.string().max(150).required().trim().messages(messages).label("سبب الحظر"),
  duration: Joi.number().integer().min(1).max(1e4).required().messages(messages).label("مدة الحظر"),
  show: Joi.array().items(Joi.string().trim().max(100)).required().min(1).messages(messages).label("صلاحيات القراءة"),
  action: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("صلاحيات التعديل"),
};

export default blockSchema;
