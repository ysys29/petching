
import { ReviewRepository } from "../repositories/reviews.repository.js";


const reviewRepository = new ReviewRepository();

export class ReviewService{
    create = async({petsitterId,userId, rating, comment}) => {  
      
      if(!rating || !comment){
        throw new Error('평점과 리뷰를 모두 입력해주세요.');
    }
       const review = await reviewRepository.create({ petsitterId, userId, rating, comment })

    return review;
    };

    readMany = async(petsitterId) => { 
       
      if(!petsitterId){
        throw new Error('펫시터를 찾을 수 없습니다.');
    }
      const reviews = await reviewRepository.readMany(petsitterId)

    return reviews;
  }

    myreadMany = async(userId) =>
    {
      if(!userId){
        throw new Error('사용자를 찾을 수 없습니다.');
    }
      const reviews = await reviewRepository.myreadMany(userId)
    
      return reviews;
   
};  
    readOne = async (reviewId) => {
      if(!reviewId){
        throw new Error('사용자를 찾을 수 없습니다.');
    }
        const review = await reviewRepository.readOne(reviewId)
        
        return review;
      
    };

    update = async({reviewId, userId, rating, comment}) => {
    
    
      
      if(!rating){
        throw new Error('수정하실 평점을 작성해주세요')
      }

      if(!comment){
        throw new Error('수정하실 리뷰를 작성해주세요.')
      }

      const updatedReview = await reviewRepository.update({reviewId: +reviewId, userId, rating, comment})
      return updatedReview;
    };


    delete = async ({ reviewId, userId }) => {
   
   
      const deletedreview = await reviewRepository.delete({ reviewId, userId})
      return deletedreview;
};
}