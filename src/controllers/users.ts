import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export const getUsers = (req: Request, res: Response, next: NextFunction) =>
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.userId;

  return User.findOne({ _id })
    .then((user) => {
      if (!user) throw new Error('requested id not found.');
      res.send({ data: user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};
