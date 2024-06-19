import { prisma } from "../utils/prisma.utils.js";

export class ReviewRepository {
    create = async({ userId, petsitterId,rating,comment })=>{
    
      
      const petsitter = await prisma.petsitter.findUnique({
            where: {id: +petsitterId },
          });

          if (!petsitter) {
            throw new Error('펫시터를 찾을 수 없습니다.');
          }
      
          const review = await prisma.review.create({
            data: {
              userId: userId,
              petsitterId: +petsitterId,
              rating: +rating,
              comment,
            },
          });
          return review;
    };
    readMany= async( )=>{
        
    };
    myreadMany=async( )=>{
        
    };
    readOne=async( )=>{
        
    };
    update=async( )=>{
        
    };
    delete=async( )=>{
        
    };
}