import { HttpError } from '../errors/http.error.js';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
export default class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  getUserInfoByUserId = async (userId) => {
    const userInfo = await this.usersRepository.getPrifile(userId);
    if (!userInfo) {
      throw new HttpError.NotFound('사용자를 찾을 수 없습니다.');
    }
    return userInfo;
  };

  updateUser = async (userId, userData) => {
    const existedUser = await this.usersRepository.getPrifile(userId);
    if (!existedUser) {
      throw new HttpError.NotFound('사용자를 찾을 수 없습니다.');
    }
    // 이메일 중복 확인
    if (userData.email && userData.email !== existedUser.email) {
      const existingEmailUser = await this.usersRepository.findOneEmail(
        userData.email
      );
      if (existingEmailUser) {
        throw new HttpError.BadRequest('이미 사용 중인 이메일입니다.');
      }
    }
    // 비밀번호 해싱
    if (userData.password) {
      userData.password = await bcrypt.hash(
        userData.password,
        HASH_SALT_ROUNDS
      );
    }
    const updatedUser = await this.usersRepository.updateUser(userId, userData);
    if (!updatedUser) {
      throw new HttpError.NotFound('사용자를 업데이트할 수 없습니다.');
    }
    return updatedUser;
  };
}
