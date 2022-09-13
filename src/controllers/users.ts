import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.user;

  return User.findOne({ _id })
    .then((user) => {
      if (!user) throw new Error('requested id not found.');
      res.send({ data: user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash: string) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user,
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
    req.user,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};
