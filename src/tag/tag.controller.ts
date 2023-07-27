import { Controller } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly studyService: TagService) {}
  @Post()
  create(@Body() createStudyDto: CreateStudyDto) {
    return this.studyService.create(createStudyDto);
  }

  @Get()
  findAll() {
    return this.studyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudyDto: UpdateStudyDto) {
    return this.studyService.update(+id, updateStudyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyService.remove(+id);
  }
}
