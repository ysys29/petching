import { MESSAGES } from '../constants/message.constant.js';
import { HttpError } from '../errors/http.error.js';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '../utils/tokens.js';

export class AuthService {
  constructor(usersRepository, petsitterRepository) {
    this.usersRepository = usersRepository;
    this.petsitterRepository = petsitterRepository;
  }

  // 회원가입
  signUp = async ({ email, password, name, introduce, profileImage }) => {
    const findOneEmail = await this.usersRepository.findOneEmail(email);

    if (findOneEmail) {
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);
    const { password: _pw, ...data } = await this.usersRepository.createUsers({
      email,
      hashedPassword,
      name,
      introduce,
      profileImage,
    });

    return data;
  };

  // 로그인
  signIn = async ({ email, password }) => {
    const user = await this.usersRepository.findOneEmail(email);
    const passwordRef = user && bcrypt.compareSync(password, user.password);

    if (!passwordRef) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.SIGN_IN.UNAUTHORIZED);
    }

    return user;
  };

  // 펫시터 회원가입
  createPetsitter = async ({
    email,
    password,
    name,
    experience,
    introduce,
    profileImage,
  }) => {
    const existingPetsitter =
      await this.petsitterRepository.findPetsitterByEmail({
        email,
      });

    if (existingPetsitter) {
      throw new HttpError.Conflict('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);

    const user = await this.petsitterRepository.createPetsitter({
      email,
      password: hashedPassword,
      name,
      experience,
      introduce,
      profileImage,
    });

    return user;
  };

  // 펫시터 로그인
  signInPetsitter = async ({ email, password }) => {
    const petsitter = await this.petsitterRepository.findPetsitterByEmail({
      email,
    });

    const decodedPassword = petsitter
      ? await bcrypt.compare(password, petsitter.password)
      : null;

    if (!petsitter || !decodedPassword) {
      throw new HttpError.Unauthorized('인증 정보가 유효하지 않습니다.');
    }

    return petsitter;
  };

  // 로그아웃
  signOut = async ({ id, hashedRefreshToken }) => {
    await this.usersRepository.refreshTokenUpdate({ id, hashedRefreshToken });
  }

  //액세스토큰, 리프레시 토큰 발급
  createAccessAndRefreshToken = async ({ id, role }) => {
    const accessToken = createAccessToken({ id, role });
    const refreshToken = createRefreshToken({ id, role });

    if( role === 'user') {
      const hashedRefreshToken = bcrypt.hashSync(refreshToken, HASH_SALT_ROUNDS);
      await this.usersRepository.refreshTokenUpdate({ id, hashedRefreshToken });
    }

    return { accessToken, refreshToken };
  };
}
