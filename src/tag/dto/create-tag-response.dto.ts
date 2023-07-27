import { ApiProperty } from '@nestjs/swagger';

export class CreateTagResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;
}
