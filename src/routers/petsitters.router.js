import express from 'express';
import { prisma } from '../utils/prisma.utils.js';
import { PetsitterController } from '../controllers/petsitters.controller.js';
import { PetsitterRepository } from '../repositories/petsitters.repository.js';
import { PetsitterService } from '../services/petsitters.service.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { requireRoles } from '../middlewares/require-roles.middleware.js';
import { PetsitterServiceRepository } from '../repositories/petsitterService.repository.js';
import { updateServiceValidator } from '../middlewares/validators/petsitter-service-validator.middleware.js';

const petsitterRouter = express.Router();

const petsitterRepository = new PetsitterRepository(prisma);
const petsitterServiceRepository = new PetsitterServiceRepository(prisma);
const petsitterService = new PetsitterService(
  petsitterRepository,
  petsitterServiceRepository
);
const petsitterController = new PetsitterController(petsitterService);

// 펫시터 목록 조회
petsitterRouter.get('/', petsitterController.getList);

//펫시터 검색 기능
petsitterRouter.get('/search', petsitterController.lookForSitter);

//펫시터 지역별 필터링
petsitterRouter.get('/filter', petsitterController.petsitterLocation);

// 펫시터 상세 조회
petsitterRouter.get('/:id', petsitterController.sitterDetail);

// 펫시터 지원 서비스 추가
petsitterRouter.post(
  '/service',
  requireAccessToken,
  requireRoles(['petsitter']),
  updateServiceValidator,
  petsitterController.serviceUpdate
);

export { petsitterRouter };
