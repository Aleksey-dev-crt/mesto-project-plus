import express, { Application } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { errors } from 'celebrate';
import mongoose from 'mongoose';
import { login, createUser } from './controllers/users';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import errorHandler from './middlewares/error';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';

const { PORT = 3000 } = process.env;
const app: Application = express();
app.use(express.json());

declare module 'express-serve-static-core' {
  interface Request {
    user: string | JwtPayload;
  }
}

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.warn(`App listening on port ${PORT}`);
});
