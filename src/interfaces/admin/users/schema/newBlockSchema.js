import Joi from "joi";
import messages from "../../../../constants/messages";

const newBlockSchema = {
  blockId: Joi.number().required().messages(messages).label("نوع الحظر"),
};

export default newBlockSchema;
