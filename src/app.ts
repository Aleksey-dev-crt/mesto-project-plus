import path from "path";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users";

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

app.use("/users", userRouter);



app.use(express.static(path.resolve("./dist")));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
