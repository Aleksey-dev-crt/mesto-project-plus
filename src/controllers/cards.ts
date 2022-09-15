import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';

export const getCards = (req: Request, res: Response, next: NextFunction) =>
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const owner = req.user;
  const { name, link } = req.body;

  return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user as JwtPayload;

  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('requested id not found.');
      if (card.owner.valueOf() !== _id) throw new ForbiddenError('not allowed action.');
      card.remove().then((data) => res.send({ data })).catch(next);
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) =>
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user } }, { new: true })
    .then((card) => {
      if (!card) throw new NotFoundError('requested id not found.');
      res.send({ data: card });
    })
    .catch(next);

export const dislikeCard = (req: Request, res: Response, next: NextFunction) =>
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: Object(req.user) } }, { new: true })
    .then((card) => {
      if (!card) throw new NotFoundError('requested id not found.');
      res.send({ data: card });
    })
    .catch(next);
