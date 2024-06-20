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
          connect: { id: user.id },
        },
      },
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
    });
    const result = {
      id: data.id,
      email: data.email,
      name: data.name,
      introduce: data.introduce,
      profileImage: data.profileImage,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return result;
  };

  findOneRefreshTokenId = async (id) => {
    const data = await this.prisma.refreshToken.findUnique({
      where: { userId: id },
    });
    return data;
  };

  getProfile = async (id) => {
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
  // 비밀번호를 포함한 사용자 정보 가져오기
  getProfileWithPassword = async (userId) => {
    const userData = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        introduce: true,
        profileImage: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return userData;
  };

  updateUser = async (userId, newPassword, name, introduce, profileImage) => {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { password: newPassword, name, introduce, profileImage },
    });
  };
  refreshTokenUpdate = async ({ id, hashedRefreshToken }) => {
    if (hashedRefreshToken === 'nodata') {
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
