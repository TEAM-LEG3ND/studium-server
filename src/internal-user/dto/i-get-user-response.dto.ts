import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class InternalGetUserResponseDto{
    @ApiProperty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsDate()
    readonly createdAt: Date;

    @ApiProperty()
    @IsDate()
    readonly updatedAt: Date;
    
    @ApiProperty()
    @IsString()
    readonly universalAccountId: string;

    @ApiProperty()
    @IsNumber()
    readonly manners: number;

    @ApiProperty()
    @IsString()
    readonly intro: string;

    @ApiProperty()
    @IsString()
    readonly profileURL: string;
}