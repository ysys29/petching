import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class PetsitterController {
  constructor(petsitterService) {
    this.petsitterService = petsitterService;
  }

  // 펫시터 목록 조회
  getList = async (req, res, next) => {
    try {
      let data = await this.petsitterService.findSitter();

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '펫시터 목록조회에 성공하였습니다',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  //펫시터 상세 조회
  sitterDetail = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);

      let data = await this.petsitterService.readSitter(id);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '펫시터 상세조회에 성공하였습니다',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  //펫시터 검색 기능
  lookForSitter = async (req, res, next) => {
    try {
      const { query } = req.query;
      console.log('test');

      let data = await this.petsitterService.searchSitters(query);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '시터 검색에 성공하였습니다',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  //펫시터 지역별 필터링
  petsitterLocation = async (req, res, next) => {
    try {
      const { location } = req.query;

      let data = await this.petsitterService.findByLocation(location);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '지역별 검색에 성공하였습니다',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}
