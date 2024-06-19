import express from 'express';
import { prisma } from '../utils/prisma.utils.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { PetsitterRepository } from '../repositories/petsitters.repository.js';
import { AuthService } from '../services/auth.service.js';
import { AuthController } from '../controllers/auth.controller.js';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';

const authRouter = express.Router();

const usersRepository = new UsersRepository(prisma);
const petsitterRepository = new PetsitterRepository(prisma);
const authService = new AuthService(usersRepository, petsitterRepository);
const authController = new AuthController(authService);

// 회원가입
authRouter.post('/sign-up', signUpValidator, authController.signUp)

// 로그인
authRouter.post('/sign-in', signInValidator, authController.signIn)

//펫시터 로그인
authRouter.post('/sign-in/petsitter', authController.signInPetsitter);


export { authRouter };
