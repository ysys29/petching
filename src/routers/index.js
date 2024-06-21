import express from 'express';
import { authRouter } from './auth.router.js';
import { bookingRouter } from './bookings.router.js';
import { bookmarkRouter } from './bookmarks.router.js';
import { petsitterRouter } from './petsitters.router.js';
import { reviewRouter } from './reviews.router.js';
import { usersRouter } from './users.router.js';
import { uploadRouter } from './uploadRouter.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/petsitters', petsitterRouter);
apiRouter.use('/bookings', bookingRouter);
apiRouter.use('/bookmarks', bookmarkRouter);
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/upload', uploadRouter);

export { apiRouter };
