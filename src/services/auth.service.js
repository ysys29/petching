import { MESSAGES } from '../constants/message.constant.js';
import { HttpError } from '../errors/http.error.js';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '../utils/tokens.js';

export class AuthService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
    this.tokensRepository = this.tokensRepository;
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

  // 펫시터 로그인
  signInPetsitter = async ({ email, password }) => {
    const petsitter = await this.usersRepository.findPetsitterByEmail({
      email,
    });
    console.log(petsitter.password);

    // const decodedPassword = petsitter
    //   ? await bcrypt.compare(password, petsitter.password)
    //   : null;

    // if (!petsitter || !decodedPassword) {
    //   throw new HttpError.Unauthorized('인증 정보가 유효하지 않습니다.');
    // }

    if (petsitter.password !== password) {
      throw new HttpError.Unauthorized('인증 정보가 유효하지 않습니다.');
    }

    return petsitter;
  };

  //액세스토큰, 리프레시 토큰 발급
  createAccessAndRefreshToken = async ({ id, role }) => {
    const accessToken = createAccessToken({ id, role });
    const refreshToken = createRefreshToken({ id, role });

    return { accessToken, refreshToken };
  };
}
