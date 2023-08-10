import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber } from 'class-validator';
import { CreateTagDto } from 'src/tag/dto/create-tag.dto';

export class CreateStudyResponseDto {
  @ApiProperty()
  @IsString()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsDate()
  readonly recruitStartDate: Date;

  @ApiProperty()
  @IsDate()
  readonly recruitEndDate: Date;

  @ApiProperty()
  @IsString()
  readonly intro: string;

  @ApiProperty()
  @IsDate()
  readonly startDate: Date;

  @ApiProperty()
  @IsDate()
  readonly endDate: Date;

  @ApiProperty()
  @IsString()
  readonly location: string;

  @ApiProperty({ required: false })
  @IsNumber()
  readonly recruiting: number;

  @ApiProperty({ required: false })
  @IsNumber()
  readonly recruited: number;

  @ApiProperty({ required: false })
  @IsString()
  readonly studyTemplate: string;

  @ApiProperty({ type: [CreateTagDto], default: [] })
  readonly tags: CreateTagDto[];

  constructor(partial: Partial<CreateStudyResponseDto>) {
    Object.assign(this, partial);
  }
}
