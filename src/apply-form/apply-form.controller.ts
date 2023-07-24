import { Controller, Get } from '@nestjs/common';
import { ApplyFormService } from './apply-form.service';

@Controller()
export class ApplyFormController {
  constructor(private readonly applyFormService: ApplyFormService) {}

  @Get()
  findAll() {
    return this.applyFormService.findAll();
  }
}
