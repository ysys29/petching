import express from 'express';
import UsersController from '../controllers/users.controllers.js';
import UsersService from '../services/users.service.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { updateProfileValidator } from '../middlewares/validators/update-profile-validator.middleware.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { prisma } from '../utils/prisma.utils.js';
import { upload } from '../middlewares/upload-image.js';
import { requireRoles } from '../middlewares/require-roles.middleware.js';

const usersRouter = express.Router();
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

usersRouter.get(
  '/mypage',
  requireAccessToken,
  requireRoles(['user']),
  usersController.readMe
);
usersRouter.patch(
  '/mypage',
  requireAccessToken,
  requireRoles(['user']),
  upload,
  updateProfileValidator,
  usersController.updateUsers
);

export { usersRouter };
