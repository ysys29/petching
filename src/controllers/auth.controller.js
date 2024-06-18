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

  //펫시터 로그인
  signInPetsitter = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const petsitter = await this.authService.signInPetsitter({
        email,
        password,
      });

      const { accessToken, refreshToken } =
        await this.authService.createAccessAndRefreshToken({
          id: petsitter.id,
          role: petsitter,
        });

      res
        .status(HTTP_STATUS.OK)
        .json({ result: true, accessToken, refreshToken });
      return;
    } catch (error) {
      next(error);
    }
  };
}
