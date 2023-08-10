import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @ApiProperty()
    @IsNumber()
    readonly manners: number;

    @IsOptional()
    @ApiProperty()
    @IsString()
    readonly intro: string;

    @IsOptional()
    @ApiProperty()
    @IsString()
    readonly profileURL: string;
}