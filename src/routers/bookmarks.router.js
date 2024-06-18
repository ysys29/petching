import express from 'express';

const bookmarkRouter = express.Router();

// 펫시터 즐겨찾기 등록
bookmarkRouter.post('/');

export { bookmarkRouter };
