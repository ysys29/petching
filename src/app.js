import express from 'express';
import 'dotenv/config';
import { SERVER_PORT } from './constants/env.constant.js';
import { apiRouter } from './routers/index.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import { HTTP_STATUS } from './constants/http-status.constant.js';
import logMiddleware from './middlewares/log.middleware.js';

const app = express();

app.use(express.json());

app.use(logMiddleware);

app.get('/health-check', (req, res, next) => {
  res.status(HTTP_STATUS.OK).json({ message: "I'm healthy" });
});

app.use('/', apiRouter);

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT}번 포트로 서버가 열렸습니다.`);
});
