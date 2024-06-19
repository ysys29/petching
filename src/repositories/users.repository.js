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
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        introduce,
        profileImage,
      },
    });

    await this.prisma.refreshToken.create({
      data: {
        refreshToken: null,
        user: {
          connect: { id: user.id }
        }
      }
    });

    return user;
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

  refreshTokenUpdate = async ({ id, hashedRefreshToken }) => {
    if (!hashedRefreshToken) {
      await this.prisma.refreshToken.update({
        where: {
          userId: id,
        },
        data: {
          refreshToken: null,
        },
      });
    } else {
      await this.prisma.refreshToken.update({
        where: {
          userId: id,
        },
        data: {
          refreshToken: hashedRefreshToken,
        },
      });
    }
  };
}
