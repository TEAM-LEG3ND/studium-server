import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Controller()
export class NoticeController {
    constructor(private readonly noticeService: NoticeService) {}

    @Get()
    findAll() {
        return this.noticeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.noticeService.findOne(+id);
    }

    @Post()
    create(@Body() createNoticeDto: CreateNoticeDto) {
        return this.noticeService.create(createNoticeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
        return this.noticeService.update(+id, updateNoticeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.noticeService.remove(+id);
    }
}
