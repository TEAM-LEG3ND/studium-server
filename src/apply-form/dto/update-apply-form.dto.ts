import { PartialType } from '@nestjs/swagger';
import { CreateApplyFormDto } from './create-apply-form.dto';

export class UpdateApplyFormDto extends PartialType(CreateApplyFormDto) {}
