
import { ReviewService } from '../services/reviews.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';


const reviewService = new ReviewService();


export class ReviewController{
    create = async (req, res, next) => {
      
        try {
          const { petsitterId }  = req.params;
          const { rating, comment } = req.body;
          const userId = req.user.id;
          
      
          const review = await reviewService.create({ petsitterId, rating, comment, userId})
      
          return res.status(HTTP_STATUS.CREATED).json({ message: '리뷰가 등록되었습니다.', data: review });
        } catch (err) {
          next(err);
        }
      };
      
    petsitterReadMany =  async (req, res, next) => {
     
      try {
        const { petsitterId } = req.params;

        const reviews = await reviewService.petsitterReadMany(petsitterId)
    
        res.status(HTTP_STATUS.OK).json(reviews);
        } catch (err) {
            next(err);
        }
    };

    myReadMany = async (req, res, next) => {
        const { userId } = req.params;
          try {
           
            const reviews = await reviewService.myReadMany(userId);
            return res.status(HTTP_STATUS.OK).json(reviews);
        } catch (err) {
            next(err);
        }
    };

    readOne = async (req, res, next) => {
        try {
          const { reviewId } = req.params;
  
    
          const review = await reviewService.readOne(reviewId);
          
         
          res.status(200).json(review);
        } catch (err) {
          next(err);
        }
      };

    update =  async (req, res, next) => {
        try {
            const { reviewId } = req.params;
            const userId  = req.user.id;
            const { rating, comment } = req.body;
         
      
         
          const updatedReview = await reviewService.update({ reviewId: +reviewId, userId, rating,comment });
          res.status(200).json(updatedReview);
        } catch (error) {
          next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
          const { reviewId } = req.params; 
          const userId  = req.user.id;
          console.log(req.user)
    
         
          const deletedReview = await reviewService.delete({reviewId: +reviewId, userId});
          
          res.status(200).json(deletedReview);
        } catch (error) {
          next(error);
        }
      };
}