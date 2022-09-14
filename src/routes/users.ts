import { Router } from 'express';
import { getUsers, getUserById, updateProfile, updateAvatar, getUser } from '../controllers/users';
import { profileValidator, avatarValidator, idValidator } from '../utils/requestValidators';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', idValidator, getUserById);
usersRouter.patch('/me', profileValidator, updateProfile);
usersRouter.patch('/me/avatar', avatarValidator, updateAvatar);

export default usersRouter;
