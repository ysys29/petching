import express from 'express';
import { prisma } from '../utils/prisma.utils.js';
import { BookingsController } from '../controllers/bookings.controller.js';
import { BookingsService } from '../services/bookings.service.js';
import { BookingsRepository } from '../repositories/bookings.repository.js';
import { PetsitterRepository } from '../repositories/petsitters.repository.js';
import { requireRoles } from '../middlewares/require-roles.middleware.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { bookingsValidator } from '../middlewares/validators/bookings-validator.middleware.js';
import { updateBookingValidator } from '../middlewares/validators/updateBooking-validator.middleware.js';
import { updateBookingStatusValidator } from '../middlewares/validators/update-booking-status-validator.middleware.js';

// import tempMiddleware from '../middlewares/temp.middleware.js';

const bookingRouter = express.Router();

const bookingsRepository = new BookingsRepository(prisma);
const petsitterRepository = new PetsitterRepository(prisma);
const bookingsService = new BookingsService(
  bookingsRepository,
  petsitterRepository
);
const bookingsController = new BookingsController(bookingsService);

//예약 생성
bookingRouter.post(
  '/',
  bookingsValidator,
  requireAccessToken,
  requireRoles(['user']),
  bookingsController.createBooking
);

//예약 목록 조회
bookingRouter.get('/', requireAccessToken, bookingsController.findAllBookings);

//예약 상세 조회
bookingRouter.get(
  '/:bookingId',
  requireAccessToken,
  bookingsController.findBooking
);

//예약 수정
bookingRouter.patch(
  '/:bookingId',
  updateBookingValidator,
  requireAccessToken,
  requireRoles(['user']),
  bookingsController.updateBooking
);

//예약 취소 --유저가
bookingRouter.delete(
  '/:bookingId',
  requireAccessToken,
  requireRoles(['user']),
  bookingsController.cancelBooking
);

//예약 승인 or 거절 --펫시터가
bookingRouter.patch(
  '/:bookingId/status',
  updateBookingStatusValidator,
  requireAccessToken,
  requireRoles(['petsitter']),
  bookingsController.statusUpdate
);

export { bookingRouter };
