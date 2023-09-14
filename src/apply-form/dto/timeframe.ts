import { ApiProperty } from '@nestjs/swagger';

export class TimeFrame {
  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;

  //@ApiProperty()
  //applyFormId: number;
}
