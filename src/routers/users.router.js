import express from 'express';
import tempMiddleware from '../middlewares/temp.middleware.js';
import UsersController from '../controllers/users.controllers.js';
import UsersService from '../services/users.service.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { prisma } from '../utils/prisma.utils.js';
import { upload } from '../middlewares/upload-image.js';

const usersRouter = express.Router();
const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

usersRouter.get(
  '/mypage',
  tempMiddleware,
  usersController.readMe.bind(usersController)
);
usersRouter.patch(
  '/mypage',
  tempMiddleware,
  upload.single('profileImage'),
  usersController.updateUsers.bind(usersController)
);

export { usersRouter };
