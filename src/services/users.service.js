import bcrypt from 'bcrypt';
import { HttpError } from '../errors/http.error.js';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
export default class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  getUserInfoByUserId = async (userId) => {
    const userInfo = await this.usersRepository.getProfile(userId);
    if (!userInfo) {
      throw new HttpError.NotFound('사용자를 찾을 수 없습니다.');
    }
    return userInfo;
  };

  updateUser = async ({
    userId,
    password,
    newPassword,
    newPasswordConfirm,
    name,
    introduce,
  }) => {
    const existedUser =
      await this.usersRepository.getProfileWithPassword(userId);
    if (!existedUser) {
      throw new HttpError.NotFound('사용자를 찾을 수 없습니다.');
    }

    // 비밀번호 확인 및 해싱
    if (password) {
      const dbPasswordMatch = await bcrypt.compare(
        password,
        existedUser.password
      );
      if (!dbPasswordMatch) {
        throw new HttpError.BadRequest('현재 비밀번호가 일치하지 않습니다.');
      }

      if (password === newPassword) {
        throw new HttpError.BadRequest(
          '비밀번호와 새 비밀번호가 달라야 합니다.'
        );
      }

      if (newPassword !== newPasswordConfirm) {
        throw new HttpError.BadRequest(
          '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.'
        );
      }
    }

    const hashedPassword = password
      ? await bcrypt.hash(newPassword, HASH_SALT_ROUNDS)
      : undefined;

    const updatedUser = await this.usersRepository.updateUser(
      userId,
      hashedPassword,
      name,
      introduce
    );
    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      introduce: updatedUser.introduce,
      profileImage: updatedUser.profileImage,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  };
}
