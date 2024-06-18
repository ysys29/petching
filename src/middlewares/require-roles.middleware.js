import { HTTP_STATUS } from '../constants/http-status.constant.js';

export const requireRoles = (roles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      const hasPermission = user && roles.includes(user.role);

      if (!hasPermission) {
        res
          .status(HTTP_STATUS.FORBIDDEN)
          .json({ message: '접근권한이 없습니다.' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
