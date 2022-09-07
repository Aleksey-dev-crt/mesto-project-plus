import path from "path";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

declare module "express-serve-static-core" {
  interface Request {
    user: { _id: string };
  }
}

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: "6315da62af685a16388fbe22",
  };

  next();
});

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(express.static(path.resolve("./dist")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const DEFAULT_ERROR_CODE = 500;
  const VALIDATION_ERROR_CODE = 400;
  const NOTFOUND_ERROR_CODE = 404;
  if (err.name === "ValidationError") {
    return res.status(VALIDATION_ERROR_CODE).send({
      message: err.message,
    });
  }
  if (err.name === "CastError" || err.message === "requested id not found.") {
    return res.status(NOTFOUND_ERROR_CODE).send({
      message: "requested id not found.",
    });
  }
  return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
