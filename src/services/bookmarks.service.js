import { BookmarkRepository } from '../repositories/bookmarks.repository.js';

export class BookmarkService {
  bookmarkRepository = new BookmarkRepository();

  // 펫시터 북마크 하기

  followSitter = async (userId, petsitterId) => {
    const user = await this.bookmarkRepository.findUserById(userId);
    const petsitter = await this.bookmarkRepository.findSitterById(petsitterId);

    const bookmarking = await this.bookmarkRepository.createBookmark(
      userId,
      petsitterId
    );

    if (!user || !petsitter) {
      throw new Error('정보가 없습니다');
    }

    return bookmarking;
  };
  2;
}
