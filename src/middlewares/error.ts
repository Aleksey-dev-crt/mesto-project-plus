import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode: number;
}

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const VALIDATION_ERROR_CODE = 400;
  const CONFLICT_EMAIL_ERROR_CODE = 409;
  const DEFAULT_ERROR_CODE = 500;
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;

  if (err.name === 'ValidationError') {
    return res.status(VALIDATION_ERROR_CODE).send({
      message: err.message,
    });
  }
  if (err.name === 'MongoServerError' && err.message.includes('E11000')) {
    return res.status(CONFLICT_EMAIL_ERROR_CODE).send({
      message: 'User with this email already exists.',
    });
  }
  res.status(statusCode).send({
    message: statusCode === DEFAULT_ERROR_CODE ? 'Server error.' : message,
  });
};

export default errorHandler;
