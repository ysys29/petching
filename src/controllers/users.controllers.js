import { HTTP_STATUS } from '../constants/http-status.constant.js';
// User의 컨트롤러(Controller)역할을 하는 클래스
export default class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }
  readMe = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userInfo = await this.usersService.getUserInfoByUserId(userId);
      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '해당 유저를 성공적으로 찾아 왔습니다.',
        data: userInfo,
      });
    } catch (err) {
      next(err);
    }
  };
  updateUsers = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const userData = req.body;
      const updatedUser = await this.usersService.updateUser(userId, userData);
      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '사용자 정보를 성공적으로 업데이트했습니다.',
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };
}
