import { HttpError } from '../errors/http.error.js';

export class PetsitterService {
  constructor(
    petsitterRepository,
    petsitterServiceRepository,
    petsitterLocationRepository
  ) {
    this.petsitterRepository = petsitterRepository;
    this.petsitterServiceRepository = petsitterServiceRepository;
    this.petsitterLocationRepository = petsitterLocationRepository;
  }

  // 펫시터 목록조회
  findSitter = async () => {
    const sitters = await this.petsitterRepository.findSitter();

    sitters.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return sitters.map((sitter) => {
      return {
        id: sitter.id,
        name: sitter.name,
        experience: sitter.experience,
        introduce: sitter.introduce,
        localtion: sitter.localtion,
        createdAt: sitter.createdAt,
      };
    });
  };
  //펫시터 상세조회
  readSitter = async (id) => {
    const sitter = await this.petsitterRepository.readSitter(id);

    return {
      id: sitter.id,
      name: sitter.name,
      experience: sitter.experience,
      email: sitter.email,
      profileImage: sitter.profileImage,
      introduce: sitter.introduce,
      createdAt: sitter.createdAt,
      updatedAt: sitter.updatedAt,
    };
  };

  //펫시터 검색
  searchSitters = async (query) => {
    const sitters = await this.petsitterRepository.searchSitters(query);

    sitters.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return sitters.map((sitter) => {
      return {
        id: sitter.id,
        name: sitter.name,
        experience: sitter.experience,
        introduce: sitter.introduce,
        localtion: sitter.localtion,
        profileImage: sitter.profileImage,
        createdAt: sitter.createdAt,
      };
    });
  };
  //펫시터 지역별 필터링
  findByLocation = async (location) => {
    const sitters = await this.petsitterRepository.findByLocation(location);

    sitters.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return sitters.map((sitter) => {
      return {
        id: sitter.id,
        name: sitter.name,
        experience: sitter.experience,
        introduce: sitter.introduce,
        localtion: sitter.petsitterLocation
          .map((loc) => loc.location)
          .join(', '),
        profileImage: sitter.profileImage,
        createdAt: sitter.createdAt,
      };
    });
  };

  serviceCreate = async ({ petsitterId, animalType, serviceType, price }) => {
    const existingService =
      await this.petsitterServiceRepository.findPetsitterService({
        petsitterId,
        animalType,
        serviceType,
      });

    if (existingService) {
      throw new HttpError.BadRequest('이미 저장된 서비스 내용입니다.');
    }

    const createData = await this.petsitterServiceRepository.createService({
      petsitterId,
      animalType,
      serviceType,
      price,
    });

    return createData;
  };

  locationCreate = async ({ petsitterId, location, surcharge }) => {
    const existingLocation =
      await this.petsitterLocationRepository.findPetsitterLocation({
        petsitterId,
        location,
      });

    if (existingLocation) {
      throw new HttpError.BadRequest('이미 저장된 서비스 지역입니다.');
    }

    const createData = await this.petsitterLocationRepository.createLocation({
      petsitterId,
      location,
      surcharge,
    });

    return createData;
  };
}
