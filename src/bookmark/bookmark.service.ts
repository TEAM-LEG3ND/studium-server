import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { BookmarkStudyResponseDto } from './dto/bookmark-study-response.dto';
import { BookmarkStudyDto } from './dto/bookmark-study.dto';
import { GetStudyResponseDto } from 'src/study/dto/get-study-response.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async register(bookmarkDto: BookmarkStudyDto): Promise<BookmarkStudyResponseDto> {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId: bookmarkDto.userId,
        studyId: bookmarkDto.studyId,
      },
    });
    return BookmarkStudyResponseDto.fromBookmark(bookmark);
  }

  async findAllBookmarkedStudies(userId: number): Promise<GetStudyResponseDto[]> {
    const userBookmarkedStudies = await this.prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
    });
    const bookmarkedStudies = await this.prisma.study.findMany({
      where: {
        id: { in: userBookmarkedStudies.map((bookmark) => bookmark.studyId) },
      },
    });
    return bookmarkedStudies.map((res) => GetStudyResponseDto.fromStudy(res));
  }
}
