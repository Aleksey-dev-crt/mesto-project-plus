import { celebrate, Joi } from 'celebrate';

export const cardValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    })
    .unknown(true),
});

export const idValidator = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().alphanum().length(24),
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
      avatar: Joi.string().required(),
    })
    .unknown(true),
});
