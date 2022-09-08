import express, {
  Request,
  Response,
  NextFunction,
  Application,
} from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import errorHandler from './utils/errors';

const { PORT = 3000 } = process.env;
const app: Application = express();
app.use(express.json());

declare module 'express-serve-static-core' {
  interface Request {
    user: { _id: string };
  }
}

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6315da62af685a16388fbe22',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.warn(`App listening on port ${PORT}`);
});
