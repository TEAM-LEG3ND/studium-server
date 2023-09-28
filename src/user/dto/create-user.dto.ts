import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly nickname: string;

  @ApiProperty()
  @IsString()
  readonly intro: string;

  @ApiProperty()
  @IsString()
  readonly profileURL: string;
}
