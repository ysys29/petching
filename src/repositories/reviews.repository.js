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

    readMany = async(petsitterId)=>{
        const reviews = await prisma.review.findMany({
            where: {
              petsitterId: +petsitterId,
            },
            include: {
              user: {
                select:{
                    id:true,
                    name: true,
                    profileImage: true,
              }
            }
            },
            orderBy: {
              createdAt: 'desc', 
            },
          });
    return reviews;
};

    myreadMany=async(userId )=>{
        const reviews = await prisma.review.findMany({
            where: {
              userId: +userId,
            },
            include: {
              user: {
                select:{
                  id:true,
                  name: true,
                  profileImage: true,
                },
              },
            
            },
            orderBy: {
              createdAt: 'desc',
            },
          });
          return reviews;
    };
    readOne=async(reviewId)=>{
      const review = await prisma.review.findUnique({
        where: {
          id: +reviewId,
        },
        include:{
          user:{select:{
            id:true,
            name: true,
            profileImage: true,
          }},
          petsitter: {select:{
              id:true,
              name: true,
              profileImage: true,
            },
          },
        }
      });
      return review;
        
    };
    update = async({reviewId, rating, comment })=>{
      const review = await prisma.review.findFirst({
        where: { id: +reviewId},
      })
      if(!review){
        throw new Error('리뷰를 찾을 수 없습니다.');
      }

      const updatedReview = await prisma.review.update({
        where:{ id: +reviewId},
        data:{
          rating: +rating,
          comment: comment,
        }
      })
      return updatedReview;
     
   };

    
    delete=async({ reviewId} )=>{
      
      const deletedreview = await prisma.review.delete({
        where:{
          id: +reviewId        
    }
  })
   return deletedreview;
  }
  }
