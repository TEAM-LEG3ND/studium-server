import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';


export class CreateUserDto{
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

    @ApiProperty()
    @IsString()
    readonly intro: string;

    @ApiProperty()
    @IsString()
    readonly profileURL: string;
}