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
	const data = await this.usersRepository.createUsers({
		email,
		hashedPassword,
		name,
		introduce,
		profileImage
	});

	return data;
  };
}
