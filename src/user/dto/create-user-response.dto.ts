import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateUserResponseDto {
    @ApiProperty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsDate()
    readonly createdAt: Date;

    @ApiProperty()
    @IsNumber()
    readonly manners: number;

    @ApiProperty()
    @IsString()
    readonly intro: string;

    @ApiProperty()
    @IsString()
    readonly profileURL: string;

    constructor(partial: Partial<CreateUserResponseDto>) {
        Object.assign(this, partial);
    }
}