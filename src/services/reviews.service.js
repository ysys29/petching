

import { ReviewRepository } from "../repositories/reviews.repository.js";


const reviewRepository = new ReviewRepository();

export class ReviewService{
    create = async(petsitterId,rating,comment) => {  
        const petsitter = await reviewRepository.create({petsitterId})
       

        if (!petsitter) {
          throw new Error('펫시터를 찾을 수 없습니다.');
        }
  
       const review = await reviewRepository.create({ rating,comment})

      if(!rating || !comment){
        throw new Error('평점과 리뷰를 모두 입력해주세요.');
    }
    return review;
    };
    readMany = async() => {};
    myreadMany = async() => {};
    update = async() => {};
    delete = async () => {};
}