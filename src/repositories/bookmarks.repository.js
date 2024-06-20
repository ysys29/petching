import { prisma } from '../utils/prisma.utils.js';

export class BookmarkRepository {
  findSitterById = async (id) => {
    const data = await prisma.petsitter.findUnique({
      where: { id: +id },
    });
    return data;
  };

  findUserById = async (id) => {
    const temp = await prisma.user.findMany();

    const data = await prisma.user.findUnique({
      where: { id },
    });
    return data;
  };

  createBookmark = async (userId, petsitterId) => {
    const data = await prisma.bookmark.create({
      data: {
        userId,
        petsitterId: +petsitterId,
      },
    });
    return data;
  };
}
