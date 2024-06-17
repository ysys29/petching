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

  //펫시터 아이디로 예약 찾기
  findBookingByPetsitterId = async ({ petsitterId, date }) => {
    const findBooking = await this.prisma.booking.findFirst({
      where: { petsitterId, date },
    });

    return findBooking;
  };

  //부킹 아이디로 예약 찾기
  findBookingByuBookingId = async ({ bookingId }) => {
    const findBooking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
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

  //예약 삭제
  deleteBooking = async ({ bookingId }) => {
    await this.prisma.booking.delete({ where: { id: bookingId } });
  };
}
