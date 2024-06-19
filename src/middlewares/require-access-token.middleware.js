import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import jwt from 'jsonwebtoken';
import { HttpError } from '../errors/http.error.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { PetsitterRepository } from '../repositories/petsitters.repository.js';
import { prisma } from '../utils/prisma.utils.js';

const usersRepository = new UsersRepository(prisma);
const petsittersRepository = new PetsitterRepository(prisma);

export const requireAccessToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NO_TOKEN);
    }

    const [type, accessToken] = authorization.split(' ');

    if (type !== 'Bearer') {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NOT_SUPPORTED_TYPE);
    }

    if (!accessToken) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NO_TOKEN);
    }

    let payload;
    try {
      payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.EXPIRED);
      } else {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.INVALID);
      }
    }

    const { id } = payload;
    const { role } = payload;

    const user =
      role === 'user'
        ? await usersRepository.findOneId(id)
        : await petsittersRepository.findPetsitterById({ id });
        
    if (!user) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NO_USER);
    }

    const { refreshToken } = await usersRepository.findOneRefreshTokenId(id);

    if (refreshToken === null) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.JWT.NO_TOKEN);
    }

    req.user = { ...user, role };
    next();
  } catch (error) {
    next(error);
  }
};
