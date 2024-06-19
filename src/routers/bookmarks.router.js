import express from 'express';
import { BookmarkController } from '../controllers/bookmarks.controller.js';
import bookmarkMiddleware from '../middlewares/tempbookmark-middleware.js';

const bookmarkRouter = express.Router();
const bookmarkController = new BookmarkController();

// 펫시터 즐겨찾기 등록
bookmarkRouter.post(
  '/:petsitterId/follow',
  bookmarkMiddleware,
  bookmarkController.followSitter
);

export { bookmarkRouter };
