import { prisma } from "../utils/prisma.utils.js";

export class ReviewRepository {

  findUniquePetsitter = async(petsitterId) => {
    const petsitter = await prisma.petsitter.findUnique({
      where: { id: +petsitterId},
    
    })
    return petsitter;
  }

  
    create = async({ userId, petsitterId,rating,comment })=>{
      
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


    petsitterReadMany = async(petsitterId)=>{
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


findUniqueUser = async(userId) => {
  const user = await prisma.user.findUnique({
    where: { id: +userId},
  
  })
  return user;
}


    myReadMany=async(userId)=>{
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
      const review = await prisma.review.findFirst({
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
   
      const updatedReview = await prisma.review.update({
        where:{ id: +reviewId},
        data:{
          rating: +rating,
          comment: comment,
        }
      })
      return updatedReview;
     
   };

    
    findUnique = async(reviewId) => {
      const review = await prisma.review.findUnique({
        where: { id: +reviewId},
      })
      return review;
    }

    
    delete= async(reviewId)=>{
       
    
      const deletedreview = await prisma.review.delete({
        where:{ id: +reviewId   }
  })
   return deletedreview;
  }
  }
