export class UsersRepository {
  constructor(prisma) {
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

    const findId = await this.prisma.user.findFirst({
      where: { email },
    });

    const refreshTokenCreate = await this.prisma.refreshToken.create({
      data: {
        userId: findId.id,
        refreshToken: null,
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
    const data = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    return data;
  };

  findOneRefreshTokenId = async (id) => {
    const data = await this.prisma.refreshToken.findUnique({
      where: { userId: id },
    });

    return data;
  };

  refreshTokenUpdate = async ({ id, hashedRefreshToken }) => {
    const data = await this.prisma.refreshToken.update({
      where: {
        userId: id,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  };
}
