import express from 'express';
import { prisma } from '../utils/prisma.utils.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { AuthService } from '../services/auth.service.js';
import { AuthController } from '../controllers/auth.controller.js';
import { signupValidator } from '../middlewares/validators/sign-up-validator.middleware.js';

const authRouter = express.Router();

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

// 회원가입
authRouter.post('/sign-up', signupValidator, authController.signUp)

authRouter.post('/sign-in', async(req, res, next) =>{
   try{ const { email, password } = req.body;
    if(!email || !password){
          return res.status(400).json({message: '이메일과 비밀번호를 입력해주세요.'})
    }
}catch(err){
    next(err)
}
})

export { authRouter };
