import express from 'express';
import UsersController from '../controllers/users.controllers.js';
import UsersService from '../services/users.service.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { updatePrifileValidator } from '../middlewares/validators/update-prifile-validator.middleware.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { prisma } from '../utils/prisma.utils.js';
import { upload } from '../middlewares/upload-image.js';

const usersRouter = express.Router();
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

usersRouter.get(
  '/mypage',
  requireAccessToken,
  usersController.readMe.bind(usersController)
);
usersRouter.patch(
  '/mypage',
  requireAccessToken,
  upload,
  updatePrifileValidator,
  usersController.updateUsers.bind(usersController)
);

export { usersRouter };
