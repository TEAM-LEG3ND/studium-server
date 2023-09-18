import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkStudyDto } from './dto/bookmark-study.dto';
import { BookmarkStudyResponseDto } from './dto/bookmark-study-response.dto';
import { GetStudyResponseDto } from 'src/study/dto/get-study-response.dto';

@Controller()
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  registerAsBookmark(@Body() bookmarkStudyDto: BookmarkStudyDto): Promise<BookmarkStudyResponseDto> {
    return this.bookmarkService.register(bookmarkStudyDto);
  }

  @Get(':userId')
  findEveryBookmarkedStudies(@Param('userId') id: string): Promise<GetStudyResponseDto[]> {
    return this.bookmarkService.findAllBookmarkedStudies(+id);
  }
}
