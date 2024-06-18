import express from 'express';
import { prisma } from '../utils/prisma.utils.js';
import { BookingsController } from '../controllers/bookings.controller.js';
import { BookingsService } from '../services/bookings.service.js';
import { BookingsRepository } from '../repositories/bookings.repository.js';

import tempMiddleware from '../middlewares/temp.middleware.js';

const bookingRouter = express.Router();

const bookingsRepository = new BookingsRepository(prisma);
const bookingsService = new BookingsService(bookingsRepository);
const bookingsController = new BookingsController(bookingsService);

//예약 생성
bookingRouter.post('/', tempMiddleware, bookingsController.createBooking);

//예약 목록 조회
bookingRouter.get('/', tempMiddleware, bookingsController.findAllBookings);

//예약 상세 조회
bookingRouter.get(
  '/:bookingId',
  tempMiddleware,
  bookingsController.findBooking
);

//예약 수정
bookingRouter.patch(
  '/:bookingId',
  tempMiddleware,
  bookingsController.updateBooking
);

//예약 취소 --유저가
bookingRouter.patch(
  '/:bookingId',
  tempMiddleware,
  bookingsController.cancelBooking
);

//예약 승인 or 거절 --펫시터가
bookingRouter.patch(
  '/:bookingId/status',
  tempMiddleware,
  bookingsController.statusUpdate
);

export { bookingRouter };
