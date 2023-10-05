import Joi from "joi";

let errorMessages = {
  discountFreeMessages: {
    "number.base": 'حقل "خصم مجاني" يجب أن يكون رقمًا.',
    "any.required": 'حقل "خصم مجاني" مطلوب.',
  },

  discountPaidMessages: {
    "number.base": 'حقل "خصم مدفوع" يجب أن يكون رقمًا.',
    "any.required": 'حقل "خصم مدفوع" مطلوب.',
  },

  GiftCardMessages: {
    "number.base": 'حقل "بطاقة هدية" يجب أن يكون رقمًا.',
    "any.required": 'حقل "بطاقة هدية" مطلوب.',
  },

  GiftPackMessages: {
    "number.base": 'حقل "صندوق هدايا" يجب أن يكون رقمًا.',
    "any.required": 'حقل "صندوق هدايا" مطلوب.',
  },

  spamMessages: {
    "number.base": 'حقل "رسائل البريد المزعج" يجب أن يكون رقمًا.',
    "any.required": 'حقل "رسائل البريد المزعج" مطلوب.',
  },

  GiftOfferMoreMessages: {
    "number.base": 'حقل "عرض هدية إضافي" يجب أن يكون رقمًا.',
    "any.required": 'حقل "عرض هدية إضافي" مطلوب.',
  },
};

export const configSchema = {
  discountFreeAtLeast: Joi.number().required().messages(errorMessages.discountFreeMessages),
  discountFreeAtMost: Joi.number().greater(Joi.ref("discountFreeAtLeast")).required().messages(errorMessages.discountPaidMessages),
  discountPaidATleast: Joi.number().required().messages(errorMessages.discountFreeMessages),
  discountPaidAtMost: Joi.number().greater(Joi.ref("discountPaidATleast")).required().messages(errorMessages.discountPaidMessages),
  GiftCard: Joi.number().required().messages(errorMessages.GiftCardMessages),
  GiftPack: Joi.number().required().messages(errorMessages.GiftPackMessages),
  spam: Joi.number().required().messages(errorMessages.spamMessages),
  GiftOfferMore: Joi.number().required().messages(errorMessages.GiftOfferMoreMessages),
};
