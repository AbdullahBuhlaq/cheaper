import messages from "../../../../constants/messages";
import Joi from "joi";

const shopkeeperSchema = {
  name: Joi.string().required().min(2).max(50).trim().messages(messages).label("الاسم"),
  gender: Joi.string().required().messages(messages).label("الجنس"),
  email: Joi.string()
    .trim()
    .pattern(/[a-zA-Z0-9\_\.]+(@gmail\.com)$/)
    .allow(null)
    .messages(messages)
    .label("البريد الإلكتروني"),
  phoneNumber: Joi.string()
    .trim()
    .required()
    .pattern(/^(09)(\d{8})$/)
    .messages(messages)
    .label("رقم الهاتف"),
  username: Joi.string()
    .trim()
    .pattern(/[a-zA-Z]+[a-zA-Z0-9\_\.]*$/)
    .min(3)
    .max(30)
    .required()
    .messages(messages)
    .label("اسم المستخدم"),
  birthday: Joi.date().required().messages(messages),
  locationText: Joi.string().allow(null).messages(messages).label("العنوان"),
  password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
  nameStore: Joi.string().required().min(3).max(50).trim().messages(messages).label("اسم المحل"),
  longitude: Joi.number().required().messages(messages).label("الاحداثيات"),
  latitude: Joi.number().required().messages(messages).label("الاحداثيات"),
  city: Joi.string().required().messages(messages).label("المدينة"),
  fromHour: Joi.string().required().messages(messages).label("وقت افتتاح المحل"),
  toHour: Joi.string().required().messages(messages).label("وقت إغلاق المحل"),
  category: Joi.string().required().trim().messages(messages).label("تصنيف المحل"),
};

export default shopkeeperSchema;
