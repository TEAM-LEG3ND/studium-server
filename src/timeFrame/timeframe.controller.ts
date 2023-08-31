import { Controller, Get, Param } from '@nestjs/common';
import { TimeFrameService } from './timeframe.service';

@Controller()
export class TimeFrameController {
  constructor(private readonly timeFrameService: TimeFrameService) {}

  @Get()
  findAll() {
    return this.timeFrameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeFrameService.findOne(+id);
  }
}
