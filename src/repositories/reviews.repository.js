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
    readOne=async( )=>{
        
    };
    update=async( )=>{
        
    };
    delete=async( )=>{
        
    };
}