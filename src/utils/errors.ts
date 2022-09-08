import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const DEFAULT_ERROR_CODE = 500;
  const VALIDATION_ERROR_CODE = 400;
  const NOTFOUND_ERROR_CODE = 404;
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
  return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
};

export default errorHandler;
