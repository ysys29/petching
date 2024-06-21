import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { HttpError } from '../errors/http.error.js';

export class UploadController {
  constructor(uploadService) {
    this.uploadService = uploadService;
  }

  uploadProfileImage = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { role } = req.user;

      if (!req.file) {
        throw new HttpError.BadRequest('업로드할 이미지를 선택해 주세요');
      }

      const profileImage = req.file.location;
      // const profileImage = req.file ? req.file.location : undefined; //?????????

      // 이미지 업로드
      const data = await this.uploadService.uploadProfileImage({
        userId,
        profileImage,
        role,
      });

      res.status(HTTP_STATUS.CREATED).json({ message: true, data });
      return;
    } catch (error) {
      next(error);
    }
  };
}
