import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDto{
    // todo study, member, applyFroms entitys
    @IsOptional()
    @ApiProperty()
    readonly studyJoined;

    @ApiProperty()
    @IsNumber()
    readonly manners: number;

    @IsOptional()
    @ApiProperty()
    readonly membersof;

    @IsOptional()
    @ApiProperty()
    readonly applyForms;
}