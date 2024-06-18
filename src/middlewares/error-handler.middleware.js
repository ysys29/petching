import { HTTP_STATUS } from '../constants/http-status.constant.js';

const errorHandler = (err, res, next) => {
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

export default errorHandler;
