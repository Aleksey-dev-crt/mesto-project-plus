import { Router } from 'express';
import { getUsers, getUserById, updateProfile, updateAvatar, getUser } from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

export default usersRouter;
