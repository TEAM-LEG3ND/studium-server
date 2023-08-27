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
    @IsString()
    readonly nickname: string;

    @ApiProperty()
    @IsNumber()
    readonly manners: number;

    @ApiProperty()
    @IsString()
    readonly intro: string;

    @ApiProperty()
    @IsString()
    readonly profileURL: string;

    constructor(id: number, createdAt: Date, nickname: string, manners: number, intro: string, profileURL: string) {
        this.id = id;
        this.createdAt = createdAt;
        this.nickname = nickname;
        this.manners = manners;
        this.intro = intro;
        this.profileURL = profileURL;
    }

    static fromUser(user: User) {
        return new CreateUserResponseDto(user.id, user.createdAt, user.nickname, user.manners, user.intro, user.profileURL);
    }
}