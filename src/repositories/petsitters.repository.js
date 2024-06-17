import { prisma } from '../utils/prisma.utils.js';

export class PetsitterRepository {
  // 펫시터 목록 조회
  findSitter = async () => {
    const data = await prisma.petsitter.findMany();
    return data;
  };
}
