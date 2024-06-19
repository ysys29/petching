import express from 'express';
import { BookmarkController } from '../controllers/bookmarks.controller.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

const bookmarkRouter = express.Router();
const bookmarkController = new BookmarkController();

// 펫시터 즐겨찾기 등록
bookmarkRouter.post(
  '/:petsitterId/follow',
  requireAccessToken,
  bookmarkController.followSitter
);

export { bookmarkRouter };
