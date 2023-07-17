import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
export class CreateApplyFormDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    readonly userId: number;
    
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    readonly studyId: number;

    @ApiProperty()
    @IsOptional()
    readonly answer;   
}
