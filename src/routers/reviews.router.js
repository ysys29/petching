import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { ReviewController } from '../controllers/reviews.controller.js';
import { ReviewService } from '../services/reviews.service.js';
import { ReviewRepository } from '../repositories/reviews.repository.js';


const reviewRouter = express.Router();

const reivewsRepository = new ReviewRepository();
const reviewsService = new ReviewService(reivewsRepository);
const reviewsController = new ReviewController(reviewsService);



reviewRouter.post('/:petsitterId', requireAccessToken, reviewsController.create);

reviewRouter.get('/:petsitterId',  requireAccessToken, reviewsController.readMany);

reviewRouter.get('/myreviews/:userId',  requireAccessToken,reviewsController.myreadMany);

reviewRouter.get('/review/:reviewId',  requireAccessToken, reviewsController.readOne);

reviewRouter.patch('/myreviews/:reviewId',  requireAccessToken,reviewsController.update);

reviewRouter.delete('/myreviews/:reviewId',   requireAccessToken, reviewsController.delete);








export { reviewRouter };
