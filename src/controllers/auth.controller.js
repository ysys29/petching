import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { email, password, name, introduce } = req.body;
      const imageUrl = req.file ? req.file.location : undefined;

      const data = await this.authService.signUp({
        email,
        password,
        name,
        introduce,
        profileImage: imageUrl,
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

  // 로그인
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.authService.signIn({
        email,
        password,
      });

      const { accessToken, refreshToken } =
        await this.authService.createAccessAndRefreshToken({
          id: user.id,
          role: 'user',
        });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };

  //펫시터 회원가입
  signUpPetsitter = async (req, res, next) => {
    try {
      const { email, password, name, experience, introduce, profileImage } =
        req.body;

      const data = await this.authService.createPetsitter({
        email,
        password,
        name,
        experience: experience ? Number(experience) : undefined,
        introduce,
        profileImage,
      });

      res
        .status(HTTP_STATUS.CREATED)
        .json({ message: '펫시터로 회원가입 했습니다.', data: data.id });
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
          role: 'petsitter',
        });

      res
        .status(HTTP_STATUS.OK)
        .json({ result: true, accessToken, refreshToken });
      return;
    } catch (error) {
      next(error);
    }
  };

  // 로그아웃
  signOut = async (req, res, next) => {
    try {
      const user = req.user;

      await this.authService.signOut({
        id: user.id,
        hashedRefreshToken: 'nodata',
      });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_OUT.SUCCEED,
        data: { id: user.id },
      });
    } catch (error) {
      next(error);
    }
  };

  // 토큰 재발급
  renewTokens = async (req, res, next) => {
    try {
      const user = req.user;
      const id = user.id;
      const role = user.role;

      const { accessToken, refreshToken } =
        await this.authService.createAccessAndRefreshToken({
          id,
          role,
        });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.TOKEN,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };
}
