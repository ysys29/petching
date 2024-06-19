import { MESSAGES } from '../constants/message.constant.js';
import { HttpError } from '../errors/http.error.js';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
import bcrypt from 'bcrypt';

export class AuthService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
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

    const payload = { id: user.id };
    const data = await 
    
  }
}
