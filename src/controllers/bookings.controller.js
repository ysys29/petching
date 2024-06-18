import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class BookingsController {
  constructor(bookingsService) {
    this.bookingsService = bookingsService;
  }

  // 예약 생성
  createBooking = async (req, res, next) => {
    try {
      //req.user에서 유저 아이디 받아오기
      //const userId = req.user.id
      const userId = 1;
      //req.body에서 펫시터 아이디와 예약 날짜, 동물 종, 서비스 타입, 요구사항 받아오기
      const { petsitterId, date, animalType, serviceType, location, content } =
        req.body;

      //예약
      const data = await this.bookingsService.createBooking({
        userId,
        petsitterId,
        date,
        animalType,
        serviceType,
        location,
        content,
      });

      res
        .status(HTTP_STATUS.CREATED)
        .json({ message: '예약을 성공했습니다.', data });
      return;
    } catch (error) {
      next(error);
    }
  };

  // 예약 목록 조회
  findAllBookings = async (req, res, next) => {
    try {
      // const userId = req.user.id
      const userId = 1;

      const bookings = await this.bookingsService.findAllBookings({ userId });

      res.status(HTTP_STATUS.OK).json({ message: '예약 목록', bookings });
      return;
    } catch (error) {
      next(error);
    }
  };

  // 예약 상세 조회
  findBooking = async (req, res, next) => {
    try {
      // const userId = req.user.id;
      const userId = 1;
      const bookingId = Number(req.params.bookingId);

      const booking = await this.bookingsService.findBooking({
        userId,
        bookingId,
      });

      res
        .status(HTTP_STATUS.OK)
        .json({ message: '예약 상세 조회 내역', booking });
      return;
    } catch (error) {
      next(error);
    }
  };

  // 예약 수정
  updateBooking = async (req, res, next) => {
    try {
      // const userId = req.user.id
      const userId = 1;
      const bookingId = Number(req.params.bookingId);
      const { date, serviceType, animalType, location, content } = req.body;

      const updatedBooking = await this.bookingsService.updateBooking({
        bookingId,
        userId,
        date,
        serviceType,
        animalType,
        location,
        content,
      });

      res
        .status(HTTP_STATUS.OK)
        .json({ message: '예약을 수정했습니다.', updatedBooking });
      return;
    } catch (error) {
      next(error);
    }
  };

  // 예약 취소
  deleteBooking = async (req, res, next) => {
    try {
      //   const userId = req.user.id;
      const userId = 1;
      const bookingId = Number(req.params.bookingId);

      const id = await this.bookingsService.deleteBooking({
        userId,
        bookingId,
      });

      res
        .status(HTTP_STATUS.OK)
        .json({ message: '예약을 취소했습니다.', date: id });
    } catch (error) {
      next(error);
    }
  };
}
