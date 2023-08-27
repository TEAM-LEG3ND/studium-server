import { ApiProperty } from '@nestjs/swagger';
import { Bookmark } from '@prisma/client';
import { IsDate, IsNumber } from 'class-validator';

export class BookmarkStudyResponseDto {
  @ApiProperty()
  @IsNumber()
  readonly studyId: number;

  @ApiProperty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsNumber()
  readonly bookmarkId: number;

  @ApiProperty()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty()
  @IsDate()
  readonly updatedAt: Date;

  constructor(studyId: number, userId: number, bookmarkId: number, createdAt: Date, updatedAt: Date) {
    this.studyId = studyId;
    this.userId = userId;
    this.bookmarkId = bookmarkId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromBookmark(bookmark: Bookmark) {
    return new BookmarkStudyResponseDto(
      bookmark.studyId,
      bookmark.userId,
      bookmark.id,
      bookmark.createdAt,
      bookmark.updatedAt,
    );
  }
}
