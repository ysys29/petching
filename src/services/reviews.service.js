
import { ReviewRepository } from "../repositories/reviews.repository.js";
import { prisma } from "../utils/prisma.utils.js";

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

    update = async() => {};
    delete = async () => {};
}