export class PetsitterServiceRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findPetsitterService = async ({ petsitterId, animalType, serviceType }) => {
    const existingService = await this.prisma.petsitterService.findFirst({
      where: { petsitterId, animalType, serviceType },
    });

    return existingService;
  };

  createService = async ({ petsitterId, animalType, serviceType, price }) => {
    const createData = await this.prisma.petsitterService.create({
      data: {
        petsitterId,
        animalType,
        serviceType,
        price,
      },
    });

    return createData;
  };
}
