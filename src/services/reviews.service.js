
import { ReviewRepository } from "../repositories/reviews.repository.js";
import { HttpError } from '../errors/http.error.js';


const reviewRepository = new ReviewRepository();

export class ReviewService{
    create = async({petsitterId,userId, rating, comment}) => {  

      const petsitter = await reviewRepository.findUniquePetsitter(petsitterId)

      if (!petsitter) {
       throw new Error('펫시터를 찾을 수 없습니다.');
     }

      if(!rating || !comment){
        throw new HttpError.BadRequest('평점과 리뷰를 모두 입력해주세요.');
    }
       const review = await reviewRepository.create({ petsitterId, userId, rating, comment })

    return review;
    };

    petsitterReadMany = async(petsitterId) => { 
        
   const petsitter = await reviewRepository.findUniquePetsitter(petsitterId)

   if (!petsitter) {
    throw new Error('펫시터를 찾을 수 없습니다.');
  }
      const reviews = await reviewRepository.petsitterReadMany(petsitterId)

    return reviews;
  }

    myReadMany = async(userId) =>
    {
      const user = await reviewRepository.findUniqueUser(userId)


      if(!user){
        throw new HttpError.NotFound('사용자를 찾을 수 없습니다.');
    }
      const reviews = await reviewRepository.myReadMany(userId)
    
      return reviews;
   
};  
    readOne = async (reviewId) => {
        
  
      const review= await reviewRepository.readOne(reviewId)
      
      if(!review){
        throw new HttpError.NotFound('리뷰를 찾을 수 없습니다.');
    }


        return review;
      
    };

    update = async({reviewId, userId, rating, comment}) => {
      
      const review = await reviewRepository.findUnique(+reviewId)
      
      if(!review){
        throw new Error('리뷰를 찾을 수 없습니다.');
      }

      if(!rating){
        throw new HttpError.BadRequest('수정하실 평점을 작성해주세요')
      }

      if(!comment){
        throw new HttpError.BadRequest('수정하실 리뷰를 작성해주세요.')
      }

      if (review.userId !== userId) {
        throw new HttpError.Forbidden('해당 리뷰를 수정할 권한이 없습니다.');
      }

      const updatedReview = await reviewRepository.update({reviewId: +reviewId, userId, rating, comment})
      return updatedReview;
    };


    delete = async ({reviewId, userId}) => {
       
      const review = await reviewRepository.findUnique(+reviewId);


      if(!review){
        throw new HttpError.NotFound('리뷰를 찾을 수 없습니다.');
    }

    if (review.userId !== userId) {
      throw new HttpError.Forbidden('해당 리뷰를 삭제할 권한이 없습니다.');
    }
   
      const deletedreview = await reviewRepository.delete(+reviewId)
      return deletedreview;
};
}