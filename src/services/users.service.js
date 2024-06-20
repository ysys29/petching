import bcrypt from 'bcrypt';
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
    // 비밀번호 확인 및 해싱
    if (
      userData.password &&
      userData.newPassword &&
      userData.newPasswordConfirm
    ) {
      const dbPasswordMatch = await bcrypt.compare(
        userData.password,
        existedUser.password
      );
      if (!dbPasswordMatch) {
        throw new HttpError.BadRequest('현재 비밀번호가 일치하지 않습니다.');
      }

      if (userData.newPassword !== userData.newPasswordConfirm) {
        throw new HttpError.BadRequest(
          '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.'
        );
      }

      userData.password = await bcrypt.hash(
        userData.newPassword,
        HASH_SALT_ROUNDS
      );
    } else {
      // 새 비밀번호가 제공되지 않으면 기존 비밀번호를 그대로 사용
      delete userData.password;
    }

    const updatedUser = await this.usersRepository.updateUser(userId, userData);
    if (!updatedUser) {
      throw new HttpError.NotFound('사용자를 업데이트할 수 없습니다.');
    }
    return updatedUser;
  };
}
