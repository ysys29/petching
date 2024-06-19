export class UsersRepository {
  constructor(prisma) {
    console.log(prisma.user);
    this.prisma = prisma;
  }

  createUsers = async ({
    email,
    hashedPassword,
    name,
    introduce,
    profileImage,
  }) => {
    const data = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        introduce,
        profileImage,
      },
    });

    return data;
  };

  findOneEmail = async (email) => {
    const data = await this.prisma.user.findUnique({
      where: { email },
    });

    return data;
  };

  findOneId = async (id) => {
    console.log('--------findOneId에 id값이 들어오나--------', id);
    console.log(this.prisma);
    const data = await this.prisma.user.findUnique({
      where: { id },
      // omit: { password: true },
    });
    return data;
  };

  findOneRefreshTokenId = async (id) => {
    const data = await this.prisma.refreshToken.findUnique({
      where: { userId: id },
    });
    return data;
  };

  findPetsitterByEmail = async ({ email }) => {
    const petsitter = await this.prisma.petsitter.findUnique({
      where: { email },
    });

    return petsitter;
  };
  getPrifile = async (id) => {
    const data = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        introduce: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return data;
  };
  updateUser = async (userId, userData) => {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { ...userData, updatedAt: new Date() },
      select: {
        id: true,
        email: true,
        name: true,
        introduce: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
}
