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
    console.log('data가 나오나', data);

    return data;
  };

  findOneRefreshTokenId = async (id) => {
    const data = await this.prisma.refreshToken.findUnique({
      where: { userId: id },
    });

    return data;
  };
}
