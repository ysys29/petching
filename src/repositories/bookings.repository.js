export class BookingsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  //예약 하나 찾기
  findBooking = async ({ petsitterId, date }) => {
    const findBooking = await this.prisma.booking.findFirst({
      where: { petsitterId, date },
    });

    return findBooking;
  };
  //예약 생성
  createBooking = async ({
    userId,
    petsitterId,
    date,
    animalType,
    serviceType,
    content,
  }) => {
    const createdBooking = await this.prisma.booking.create({
      data: {
        userId,
        petsitterId,
        date,
        animalType,
        serviceType,
        content,
      },
    });

    return createdBooking;
  };
}
