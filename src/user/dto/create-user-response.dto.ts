import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
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

    constructor(user: User) {
        this.id = user.id;
        this.createdAt = user.createdAt;
        this.manners = user.manners;
        this.intro = user.intro;
        this.profileURL = user.profileURL;
    }
}