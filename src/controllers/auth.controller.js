import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { email, password, name, introduce, profileImage } = req.body;
      
      const data = await this.authService.signUp({
        email,
        password,
        name,
        introduce,
        profileImage,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}


