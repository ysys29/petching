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
  findBookingByBookingId = async ({ bookingId, includePetsitter }) => {
    let findBooking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { petsitter: includePetsitter },
    });

    //findBooking이 존재하지 않으면 if문 내에서 문제가 생김
    if (findBooking && includePetsitter) {
      findBooking = {
        id: findBooking.id,
        userId: findBooking.userId,
        petsitterName: findBooking.petsitter.name,
        date: findBooking.date.toISOString().split('T')[0],
        animalType: findBooking.animalType,
        serviceType: findBooking.serviceType,
        location: findBooking.location,
        content: findBooking.content,
        totalPrice: findBooking.totalPrice,
        createdAt: findBooking.createdAt,
      };
    }

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
  findAllBookings = async ({ userId, sort }) => {
    let bookings = await this.prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: sort },
      include: { petsitter: true },
    });

    return bookings.map((booking) => {
      return {
        id: booking.id,
        petsitterName: booking.petsitter.name,
        animalType: booking.animalType,
        date: booking.date.toISOString().split('T')[0],
        totalPrice: booking.totalPrice,
      };
    });
  };

  //예약 수정
  updateBooking = async ({
    bookingId,
    date,
    serviceType,
    animalType,
    location,
    content,
    totalPrice,
  }) => {
    const updatedBooking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        date,
        serviceType,
        animalType,
        location,
        content,
        totalPrice,
      },
    });

    return updatedBooking;
  };

  // //예약 삭제
  // deleteBooking = async ({ bookingId }) => {
  //   await this.prisma.booking.delete({ where: { id: bookingId } });
  // };

  //예약 상태 수정
  bookingStatusUpdate = async ({ bookingId, status }) => {
    const statusUpdatedData = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    return statusUpdatedData;
  };
}
