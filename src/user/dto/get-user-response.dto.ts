import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetUserResponseDto {
    @ApiProperty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsNumber()
    readonly manners: number;

    @ApiProperty()
    @IsString()
    readonly intro: string;

    @ApiProperty()
    @IsString()
    readonly profileURL: string;

    constructor(partial: Partial<GetUserResponseDto>) {
        Object.assign(this, partial);
    }
}