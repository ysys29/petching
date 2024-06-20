export class PetsitterLocationRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findPetsitterLocation = async ({ petsitterId, location }) => {
    const existingLocation = await this.prisma.petsitterLocation.findFirst({
      where: { petsitterId, location },
    });

    return existingLocation;
  };

  createLocation = async ({ petsitterId, location, surcharge }) => {
    const createLocation = await this.prisma.petsitterLocation.create({
      data: {
        petsitterId,
        location,
        surcharge,
      },
    });

    return createLocation;
  };
}
