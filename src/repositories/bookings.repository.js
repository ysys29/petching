export class BookingsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  //펫시터 찾기
  findPetsitterById = async ({ petsitterId }) => {
    const petsitter = await this.prisma.petsitter.findUnique({
      where: { id: petsitterId },
      include: {
        petsitterService: true,
        petsitterLocation: true,
      },
    });

    return petsitter;
  };

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
    location,
    content,
    totalPrice,
  }) => {
    const createdBooking = await this.prisma.booking.create({
      data: {
        userId,
        petsitterId,
        date,
        animalType,
        serviceType,
        location,
        content,
        totalPrice,
      },
    });

    return createdBooking;
  };

  //예약 목록 조회
  findAllBookings = async ({ userId }) => {
    let bookings = await this.prisma.booking.findMany({
      where: { userId },
      include: { petsitter: true },
    });

    return bookings.map((booking) => {
      return {
        id: booking.id,
        petsitterName: booking.petsitter.name,
        animalType: booking.animalType,
        date: booking.date,
        totalPrice: booking.totalPrice,
      };
    });
  };
}
