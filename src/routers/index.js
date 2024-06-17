import express from 'express';
import { authRouter } from './auth.router.js';
import { bookingRouter } from './bookings.router.js';
import { bookmarkRouter } from './bookmarks.router.js';
import { petsitterRouter } from './petsitters.router.js';
import { reviewRouter } from './reviews.router.js';
import { userRouter } from './users.router.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/petsitters', petsitterRouter);
apiRouter.use('/bookings', bookingRouter);
apiRouter.use('/bookmarks', bookmarkRouter);
apiRouter.use('/reviews', reviewRouter);

export { apiRouter };
