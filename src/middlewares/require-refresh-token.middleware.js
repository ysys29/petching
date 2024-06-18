import { REFRESH_TOKEN_SECRET } from '../constants/env.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import jwt from 'jsonwebtoken';
import { HttpError } from '../errors/http.error.js';
import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';

const usersRepository = new UsersRepository();

export const requireRefreshToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NO_TOKEN);
    }

    const [type, refreshToken] = authorization.split(' ');

    if (type !== 'Bearer') {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NOT_SUPPORTED_TYPE);
    }

    if (!refreshToken) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NO_TOKEN);
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.EXPIRED);
      } else {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.INVALID);
      }
    }
    const { id } = payload;
    const existedRefreshToken = await usersRepository.findOneRefreshTokenId(id);

    if (!existedRefreshToken) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NO_USER);
    }

    const isValidRefreshToken = bcrypt.compareSync(
      refreshToken,
      existedRefreshToken.refreshToken
    );

    if (!isValidRefreshToken) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NO_USER);
    }

    const user = await usersRepository.findOneId(id);

    if (!user) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NO_USER);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
