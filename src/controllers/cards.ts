import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';

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

export const deleteCard = (req: Request, res: Response, next: NextFunction) =>
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) throw new Error('requested id not found.');
      res.send({ data: card });
    })
    .catch(next);

export const likeCard = (req: Request, res: Response, next: NextFunction) =>
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user } }, { new: true })
    .then((card) => {
      if (!card) throw new Error('requested id not found.');
      res.send({ data: card });
    })
    .catch(next);

export const dislikeCard = (req: Request, res: Response, next: NextFunction) =>
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: Object(req.user) } }, { new: true })
    .then((card) => {
      if (!card) throw new Error('requested id not found.');
      res.send({ data: card });
    })
    .catch(next);
