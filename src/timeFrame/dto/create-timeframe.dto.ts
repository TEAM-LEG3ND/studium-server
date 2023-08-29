import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeFrameDto {
  @ApiProperty()
  readonly start: Date;

  @ApiProperty()
  readonly end: Date;
}
