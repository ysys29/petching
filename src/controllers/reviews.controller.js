import { prisma } from "../utils/prisma.utils.js";
import { ReviewService } from '../services/reviews.service.js';

const reviewService = new ReviewService();


export class ReviewController{
    create = async (req, res, next) => {
      
        try {
          const { petsitterId }  = req.params;
          const { rating, comment } = req.body;
          const userId = req.user.id;
          
      
          const review = await reviewService.create({ petsitterId, rating, comment, userId})
      
          return res.status(201).json({ message: '리뷰가 등록되었습니다.', data: review });
        } catch (err) {
          next(err);
        }
      };
      
    readMany =  async (req, res, next) => {
     
      try {
        const { petsitterId } = req.params;

        const reviews = await reviewService.readMany(petsitterId)
    
        res.status(200).json(reviews);
        } catch (err) {
            next(err);
        }
    };

    myreadMany = async (req, res, next) => {
        const { userId } = req.params;
          try {
           
            const reviews = await reviewService.myreadMany(userId);
            return res.status(200).json(reviews);
        } catch (err) {
            next(err);
        }
    };

    readOne = async (req, res, next) => {
        try {
          const { reviewId } = req.params;
    
          if (!reviewId) {
            return res.status(400).json({ message: '리뷰 ID를 확인해주세요.' });
          }
    
          const review = await reviewService.getReviewById(reviewId);
          
          if (!review) {
            return res.status(404).json({ message: '해당 리뷰를 찾을 수 없습니다.' });
          }
          res.status(200).json(review);
        } catch (err) {
          next(err);
        }
      };

    update =  async (req, res, next) => {
        try {
            const { reviewId } = req.params;
            const { userId } = req.user;
            const { rating, comment } = req.body;
         
          if (!reviewId) {
            return res.status(400).json({ message: '리뷰를 찾을 수 없습니다.' });
          }
    
          if(!rating){
            return res.status(400).json({ message: '수정하실 평점을 작성해주세요'})
          }
    
          if(!comment){
            return res.status(400).json({ message: '수정하실 리뷰를 작성해주세요.'})
          }
      
         
          const updatedReview = await reviewService.updateReview(reviewId, rating, comment);
          res.status(200).json(updatedReview);
        } catch (error) {
          next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
          const { reviewId } = req.params; 
          const { userId } = req.user;
      
        
          if (!reviewId) {
            return res.status(400).json({ message: '리뷰를 찾을 수 없습니다.' });
          }
      
         
          const deletedReview = await reviewService.deleteReview({reviewId,userId});
          
          res.status(200).json(deletedReview);
        } catch (error) {
          next(error);
        }
      };
}