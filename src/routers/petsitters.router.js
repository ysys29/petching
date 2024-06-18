import express from 'express';
import { PetsitterController } from '../controllers/petsitters.controller.js';

const petsitterRouter = express.Router();
const petsitterController = new PetsitterController();

// /petsitters (목록조회)
// /petsitters/3 (상세 조회)
// /petsitters/apple (상세 조회)
//

// 펫시터 목록 조회
petsitterRouter.get('/', petsitterController.getList);

//펫시터 검색 기능
petsitterRouter.get('/search', petsitterController.lookForSitter);

// 펫시터 상세 조회
petsitterRouter.get('/:id', petsitterController.sitterDetail);

export { petsitterRouter };
