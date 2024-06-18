import { REFRESH_TOKEN_SECRET } from '../constants/env.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.util.js'; // 수정 필요
import { HttpError } from '../errors/http.error.js';
import bcrypt from 'bcrypt';

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
    const existedRefreshToken = await prisma.refreshToken.findUnique({
      // user repository 수정 필요
      where: { userId: id },
    });

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

    const user = await prisma.user.findUnique({ // user repository 수정 필요
      where: { id },
      omit: { password: true },
    });

    if (!user) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NO_USER);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
