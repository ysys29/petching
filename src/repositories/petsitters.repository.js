import { prisma } from '../utils/prisma.utils.js';

export class PetsitterRepository {
  // 펫시터 목록 조회
  findSitter = async () => {
    const data = await prisma.petsitter.findMany();
    return data;
  };

  //펫시터 상세조회
  readSitter = async (id) => {
    const data = await prisma.petsitter.findUnique({
      where: { id: +id },
    });
    return data;
  };

  //펫시터 이름으로 검색
  searchSitters = async (query) => {
    const data = await prisma.petsitter.findMany({
      where: {
        name: { contains: query },
      },
    });
    return data;
  };

  // 펫시터 지역별 정렬
  findByLocation = async (location) => {
    const data = await prisma.petsitter.findMany({
      where: {
        petsitterLocation: {
          some: {
            location: {
              contains: location,
            },
          },
        },
      },
      include: { petsitterLocation: true },
    });
    return data;
  };
}
