import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetTagResponseDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  constructor(partial: Partial<GetTagResponseDto>) {
    Object.assign(this, partial);
  }
}
