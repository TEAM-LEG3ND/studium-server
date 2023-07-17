import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class InternalCreateUserDto{
    @ApiProperty()
    @IsNumber()
    readonly universalAccountId: number;
}