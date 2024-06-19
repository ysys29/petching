import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { BookmarkService } from '../services/bookmarks.service.js';

export class BookmarkController {
  bookmarkService = new BookmarkService();

  followSitter = async (req, res, next) => {
    const userId = req.user.id;
    const petsitterId = req.params.petsitterId;
    try {
      const data = await this.bookmarkService.followSitter(userId, petsitterId);
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '북마크에 등록되었습니다',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}
