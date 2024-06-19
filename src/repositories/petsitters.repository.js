export class PetsitterRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 펫시터 목록 조회
  findSitter = async () => {
    const data = await this.prisma.petsitter.findMany();
    return data;
  };

  //펫시터 상세조회
  readSitter = async (id) => {
    const data = await this.prisma.petsitter.findUnique({
      where: { id: +id },
    });
    return data;
  };

  //펫시터 검색
  searchSitters = async (query) => {
    const data = await this.prisma.petsitter.findMany({
      where: {
        name: { contains: query },
      },
    });
    return data;
  };

  // 펫시터 지역별 정렬
  findByLocation = async (location) => {
    const data = await this.prisma.petsitter.findMany({
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

  //펫시터 이메일로 찾기(로그인용)
  findPetsitterByEmail = async ({ email }) => {
    const petsitter = await this.prisma.petsitter.findUnique({
      where: { email },
    });

    return petsitter;
  };

  findPetsitterById = async ({ id }) => {
    const petsitter = await this.prisma.petsitter.findUnique({
      where: { id },
    });

    return petsitter;
  };

  //펫시터 회원가입
  createPetsitter = async ({
    email,
    password,
    name,
    experience,
    introduce,
    profileImage,
  }) => {
    const user = await this.prisma.petsitter.create({
      data: {
        email,
        password,
        name,
        experience,
        introduce,
        profileImage,
      },
    });

    return user;
  };

  //펫시터 찾기
  findPetsitterByIdWith = async ({ petsitterId }) => {
    const petsitter = await this.prisma.petsitter.findUnique({
      where: { id: petsitterId },
      include: {
        petsitterService: true,
        petsitterLocation: true,
      },
    });

    return petsitter;
  };
}
