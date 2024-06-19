

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
    readMany = async() => {};
    myreadMany = async() => {};
    update = async() => {};
    delete = async () => {};
}