import Joi from "joi";
import messages from "../../../../constants/messages";

const categorySchema = {
  name: Joi.string().required().trim().min(1).max(75).messages(messages).label("الاسم"),
  checkWithImageOrNot: Joi.string().required().trim().messages(messages).label("له صور حالة؟"),
  emoji: Joi.string().required().min(1).max(50).messages(messages).label("الأيقونة"),
};

export default categorySchema;
