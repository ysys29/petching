import express, { Router } from 'express';
import authMiddleware from '../middlewares/require-access-token.js';
import { ReviewController } from '../controllers/reviews.controller.js';
import { ReviewService } from '../services/reviews.service.js';
import { ReviewRepository } from '../repositories/reviews.repository.js';


const reviewRouter = express.Router();

const reivewsRepository = new ReviewRepository();
const reviewsService = new ReviewService(reivewsRepository);
const reviewsController = new ReviewController(reviewsService);



reviewRouter.post('/:petsitterId', reviewsController.create);

reviewRouter.get('/:petsitterId', authMiddleware, reviewsController.readMany);

reviewRouter.get('/myreviews/:userId', authMiddleware, reviewsController.myreadMany);

reviewRouter.get('/:reviewId', authMiddleware, reviewsController.readOne);

reviewRouter.patch('/myreviews/:reviewId', authMiddleware, reviewsController.update);

reviewRouter.delete('/myreviews/:reviewId', authMiddleware, reviewsController.delete);








export { reviewRouter };
