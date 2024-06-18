import { HTTP_STATUS } from '../constants/http-status.constant.js';

const errorHandler = (err, req, res, next) => {

  // joi 에러처리
  if (err.name === 'ValidationError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: HTTP_STATUS.BAD_REQUEST,
      message: err.message,
    });
  }

  // Http Error 처리
  if (err.status && err.message) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message
    });
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

export default errorHandler;
