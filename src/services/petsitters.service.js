import { PetsitterRepository } from '../repositories/petsitters.repository.js';

export class PetsitterService {
  petsitterRepository = new PetsitterRepository();

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
}
