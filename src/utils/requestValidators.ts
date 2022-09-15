import { celebrate, Joi } from 'celebrate';
import { isObjectIdOrHexString, Schema } from 'mongoose';
import validationUrl from './validation';

const idValidation = (value: Schema.Types.ObjectId) => {
  if (isObjectIdOrHexString(value)) return value;
  throw new Error('incorrect id.');
};

export const cardValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().pattern(validationUrl, 'url').required(),
    })
    .unknown(true),
});

export const idValidator = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().custom(idValidation, 'id validation').required(),
    })
    .unknown(true),
});

export const profileValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(200),
    })
    .unknown(true),
});

export const avatarValidator = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().pattern(validationUrl, 'url').required(),
    })
    .unknown(true),
});

export const signinValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    .unknown(true),
});

export const signupValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().pattern(validationUrl, 'url'),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    .unknown(true),
});
