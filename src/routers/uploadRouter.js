import express from 'express';
import { profileUploadImage } from '../utils/multer.util.js';
import { prisma } from '../utils/prisma.utils.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { PetsitterRepository } from '../repositories/petsitters.repository.js';
import { UploadService } from '../services/upload.service.js';
import { UploadController } from '../controllers/upload.controller.js';

const uploadRouter = express.Router();

const usersRepository = new UsersRepository(prisma);
const petsitterRepository = new PetsitterRepository(prisma);
const uploadService = new UploadService(usersRepository, petsitterRepository);
const uploadController = new UploadController(uploadService);

// 이미지 업로드 api
uploadRouter.post(
  '/images',
  requireAccessToken,
  profileUploadImage.single('profileImage'),
  uploadController.uploadProfileImage
);

export { uploadRouter };
