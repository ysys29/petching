import { HttpError } from '../errors/http.error.js';

export class BookingsService {
  constructor(bookingsRepository) {
    this.bookingsRepository = bookingsRepository;
  }

  //예약
  createBooking = async ({
    userId,
    petsitterId,
    date,
    animalType,
    serviceType,
    content,
  }) => {
    //해당 날짜에 펫시터의 예약이 차있는지 find하기
    const existedBooking = await this.bookingsRepository.findBooking({
      petsitterId,
      date,
    });

    //예약 결과가 있다면 에러
    if (existedBooking) {
      throw new HttpError.BadRequest('해당하는 날짜에 이미 예약이 차있습니다.');
    }

    //없으면 예약
    const data = await this.bookingsRepository.createBooking({
      userId,
      petsitterId,
      date,
      animalType,
      serviceType,
      content,
    });

    return data;
  };
}
