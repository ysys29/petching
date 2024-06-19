import { HttpError } from '../errors/http.error.js';

export class BookingsService {
  constructor(bookingsRepository, petsitterRepository) {
    this.bookingsRepository = bookingsRepository;
    this.petsitterRepository = petsitterRepository;
  }

  //펫시터 아이디로 예약 찾기
  findBookingByPetsitterId = async ({ petsitterId, date }) => {
    //해당 날짜에 펫시터의 예약이 차있는지 find하기
    const existingBooking =
      await this.bookingsRepository.findBookingByPetsitterId({
        petsitterId,
        date,
      });

    return existingBooking;
  };

  // 펫시터 찾기
  findPetsitterById = async ({ petsitterId }) => {
    //해당하는 펫시터가 있는지 찾기
    const petsitter = await this.petsitterRepository.findPetsitterByIdWith({
      petsitterId,
    });

    //펫시터가 존재하지 않으면 에러
    if (!petsitter) {
      throw new HttpError.NotFound('존재하지 않는 펫시터입니다.');
    }

    return petsitter;
  };

  // 펫시터 서비스 검증
  validateService = async ({
    petsitter,
    animalType,
    serviceType,
    location,
  }) => {
    //펫시터가 해당 서비스를 제공하는지 확인
    const service = petsitter.petsitterService.find(
      (serv) =>
        serv.animalType === animalType && serv.serviceType === serviceType
    );

    if (!service) {
      throw new HttpError.BadRequest('지원하지 않는 서비스입니다.');
    }

    //펫시터가 해당 지역에 서비스하는지 확인
    const serviceLocation = petsitter.petsitterLocation.find(
      (loc) => loc.location === location
    );

    if (!serviceLocation) {
      throw new HttpError.BadRequest(
        '해당 지역에 서비스하지 않는 펫시터입니다.'
      );
    }

    return { price: service.price, surcharge: serviceLocation.surcharge };
  };

  //총 금액 계산
  calculateTotalPrice = async ({ price, surcharge }) => {
    const totalPrice = price + surcharge;

    return totalPrice;
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
  }) => {
    //펫시터 있는지 찾기
    const petsitter = await this.findPetsitterById({
      petsitterId,
    });

    //펫시터 서비스 검증
    const { price, surcharge } = await this.validateService({
      petsitter,
      animalType,
      serviceType,
      location,
    });

    //해당 날짜에 예약이 차있는지 확인
    const existingBooking = await this.findBookingByPetsitterId({
      petsitterId,
      date,
    });

    //예약 결과가 있다면 에러
    if (existingBooking) {
      throw new HttpError.BadRequest('해당하는 날짜에 이미 예약이 차있습니다.');
    }

    //총 금액 계산
    const totalPrice = await this.calculateTotalPrice({ price, surcharge });

    //없으면 예약
    const data = await this.bookingsRepository.createBooking({
      userId,
      petsitterId,
      date,
      animalType,
      serviceType,
      location,
      content,
      totalPrice,
    });

    return data;
  };

  // 예약 목록 조회
  findAllBookings = async ({ whereType, sort }) => {
    const bookings = await this.bookingsRepository.findAllBookings({
      whereType,
      sort,
    });

    return bookings;
  };

  //예약 상세 조회 --- 예약 한개 찾기로 해서
  findBookingByBookingId = async ({
    bookingId,
    userId,
    whereType,
    includePetsitter,
    petsitterId,
  }) => {
    const booking = await this.bookingsRepository.findBookingByBookingId({
      bookingId,
      includePetsitter,
    });

    if (!booking) {
      throw new HttpError.NotFound('예약이 존재하지 않습니다.');
    }

    if (
      booking.userId !== whereType?.userId &&
      booking.petsitterId !== whereType?.petsitterId &&
      booking.userId !== userId &&
      booking.petsitterId !== petsitterId
    ) {
      throw new HttpError.Forbidden('접근 권한이 없는 예약입니다.');
    }

    console.log(booking);
    return booking;
  };

  //예약 수정
  updateBooking = async ({
    bookingId,
    userId,
    date,
    serviceType,
    animalType,
    location,
    content,
  }) => {
    const booking = await this.findBookingByBookingId({ bookingId, userId });

    const petsitter = await this.findPetsitterById({
      petsitterId: booking.petsitterId,
    });

    const { price, surcharge } = await this.validateService({
      petsitter,
      animalType: animalType ?? booking.animalType,
      serviceType: serviceType ?? booking.serviceType,
      location: location ?? booking.location,
    });

    console.log('date', date);
    console.log('booking.date', booking.date);
    console.log(date === booking.date);
    console.log(typeof date);
    console.log(typeof booking.date);

    if (date.toString() !== booking.date.toString()) {
      //해당하는 날짜에 예약이 있는지 확인
      const existingBooking = await this.findBookingByPetsitterId({
        petsitterId: booking.petsitterId,
        date,
      });

      if (existingBooking) {
        throw new HttpError.BadRequest(
          '해당하는 날짜에 이미 예약이 차있습니다.'
        );
      }
    }

    const totalPrice = await this.calculateTotalPrice({ price, surcharge });

    const updatedBooking = await this.bookingsRepository.updateBooking({
      bookingId,
      date,
      serviceType,
      animalType,
      location,
      content,
      totalPrice,
    });

    return updatedBooking;
  };

  //상태 변경
  bookingStatusUpdate = async ({ userId, bookingId, petsitterId, status }) => {
    const booking = await this.findBookingByBookingId({
      petsitterId,
      bookingId,
      userId,
    });

    const updatedBooking = await this.bookingsRepository.bookingStatusUpdate({
      bookingId,
      status,
    });

    return updatedBooking.id;
  };
}
