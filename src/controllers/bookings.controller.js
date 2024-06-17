export class BookingsController {
  constructor(bookingsService) {
    this.bookingsService = bookingsService;
  }

  // 예약
  createBooking = async (req, res, next) => {
    try {
      //req.user에서 유저 아이디 받아오기
      //const userId = req.user.id
      const userId = 1;
      //req.body에서 펫시터 아이디와 예약 날짜, 동물 종, 서비스 타입, 요구사항 받아오기
      const { petsitterId, date, animalType, serviceType, content } = req.body;

      const data = await this.bookingsService.createBooking({
        userId,
        petsitterId,
        date,
        animalType,
        serviceType,
        content,
      });

      res.status(201).json({ message: '예약을 성공했습니다.', data });
    } catch (error) {
      next(error);
    }
  };

  // 예약 목록 조회
  findAllBookings = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  // 예약 상세 조회
  findBooking = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  // 예약 수정
  updateBooking = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  // 예약 취소
  deleteBooking = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
