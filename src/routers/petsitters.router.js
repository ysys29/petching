import express from 'express';
import { PetsitterController } from '../controllers/petsitters.controller.js';

const petsitterRouter = express.Router();
const petsitterController = new PetsitterController();

// 펫시터 목록 조회
petsitterRouter.get('/', petsitterController.getList);

// 펫시터 상세 조회
petsitterRouter.get('/:petsitterId');

export { petsitterRouter };
