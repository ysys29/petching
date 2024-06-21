export class UploadService {
  constructor(usersRepository, petsitterRepository) {
    this.usersRepository = usersRepository;
    this.petsitterRepository = petsitterRepository;
  }

  uploadProfileImage = async ({ userId, profileImage, role }) => {
    if (role === 'user') {
      const {
        password: _pw,
        id: _id,
        ...data
      } = await this.usersRepository.uploadUserProfileImage({
        userId,
        profileImage,
      });
      return data;
    } else {
      //펫시터일 때
      const {
        password: _pw,
        id: _id,
        ...data
      } = await this.petsitterRepository.uploadPetsitterProfileImage({
        userId,
        profileImage,
      });
      return data;
    }

    return data;
  };
}
