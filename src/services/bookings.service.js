import { HttpError } from '../errors/http.error.js';

export class BookingsService {
  constructor(bookingsRepository) {
    this.bookingsRepository = bookingsRepository;
  }

  //펫시터 아이디로 예약 찾기
  findBookingByPetsitterId = async ({ petsitterId, date }) => {
    //해당 날짜에 펫시터의 예약이 차있는지 find하기
    const existingBooking = await this.bookingsRepository.findBooking({
      petsitterId,
      date,
    });

    return existingBooking;
  };

  //부킹 아이디로 예약 찾기
  findBookingByBookingId = async ({ bookingId, userId }) => {
    const booking = await this.bookingsRepository.findBookingByuBookingId({
      bookingId,
    });

    if (booking.userId !== userId) {
      throw new HttpError.Forbidden('접근 권한이 없는 예약입니다.');
    }

    return booking;
  };

  // 펫시터 찾기
  findPetsitterById = async ({ petsitterId }) => {
    //해당하는 펫시터가 있는지 찾기
    const petsitter = await this.bookingsRepository.findPetsitterById({
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
        serv.serviceType === serviceType && serv.animalType === animalType
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
  findAllBookings = async ({ userId }) => {
    const bookings = await this.bookingsRepository.findAllBookings({ userId });

    return bookings;
  };

  // 예약 취소
  deleteBooking = async ({ userId, bookingId }) => {
    const booking = await this.findBookingByBookingId({ userId, bookingId });

    await this.bookingsRepository.deleteBooking({ bookingId });

    return booking.id;
  };
}
