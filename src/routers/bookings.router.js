import express from 'express';
import { prisma } from '../utils/prisma.utils.js';
import { BookingsController } from '../controllers/bookings.controller.js';
import { BookingsService } from '../services/bookings.service.js';
import { BookingsRepository } from '../repositories/bookings.repository.js';

const bookingRouter = express.Router();

const bookingsRepository = new BookingsRepository(prisma);
const bookingsService = new BookingsService(bookingsRepository);
const bookingsController = new BookingsController(bookingsService);

//예약 생성
bookingRouter.post('/', bookingsController.createBooking);

//예약 목록 조회
bookingRouter.get('/', bookingsController.findAllBookings);

//예약 상세 조회
bookingRouter.get('/:bookingId', bookingsController.findBooking);

//예약 수정
bookingRouter.patch('/:bookingId', bookingsController.updateBooking);

//예약 취소
bookingRouter.delete('/:bookingId', bookingsController.deleteBooking);

export { bookingRouter };
