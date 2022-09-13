import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const VALIDATION_ERROR_CODE = 400;
  const AUTH_ERROR_CODE = 401;
  const NOTFOUND_ERROR_CODE = 404;
  const CONFLICT_EMAIL_ERROR_CODE = 409;
  const DEFAULT_ERROR_CODE = 500;
  if (err.name === 'ValidationError') {
    return res.status(VALIDATION_ERROR_CODE).send({
      message: err.message,
    });
  }
  if (err.name === 'CastError' || err.message === 'requested id not found.') {
    return res.status(NOTFOUND_ERROR_CODE).send({
      message: 'requested id not found.',
    });
  }
  if (err.message === 'Authorization error.') {
    return res.status(AUTH_ERROR_CODE).send({
      message: err.message,
    });
  }
  if (err.name === 'MongoServerError' && err.message.includes('E11000')) {
    return res.status(CONFLICT_EMAIL_ERROR_CODE).send({
      message: 'User with this email already exists.',
    });
  }
  return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
};

export default errorHandler;
