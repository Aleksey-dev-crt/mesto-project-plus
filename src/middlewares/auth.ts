import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface SessionRequest extends Request {
  user: string | JwtPayload;
}

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: SessionRequest, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('Authorization error.');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new Error('Authorization error.');
  }

  req.user = payload;

  next();
};
