import express from 'express';
import authMiddleware from '../middlewares/require-access-token.js';
import { ReviewController } from '../controllers/reviews.controller.js';
import { ReviewService } from '../services/reviews.service.js';
import { ReviewRepository } from '../repositories/reviews.repository.js';
import tempMiddleware from '../middlewares/temp.middleware.js';

const reviewRouter = express.Router();

const reivewsRepository = new ReviewRepository();
const reviewsService = new ReviewService(reivewsRepository);
const reviewsController = new ReviewController(reviewsService);



reviewRouter.post('/:petsitterId',tempMiddleware, reviewsController.create);

reviewRouter.get('/:petsitterId', tempMiddleware, reviewsController.readMany);

reviewRouter.get('/myreviews/:userId', tempMiddleware, reviewsController.myreadMany);

reviewRouter.get('/:reviewId', tempMiddleware, reviewsController.readOne);

reviewRouter.patch('/myreviews/:reviewId', tempMiddleware, reviewsController.update);

reviewRouter.delete('/myreviews/:reviewId', tempMiddleware, reviewsController.delete);






export { reviewRouter };
