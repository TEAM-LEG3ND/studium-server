import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { User } from '@prisma/client';

export class GetUserResponseDto {
    @ApiProperty()
    @IsNumber()
    readonly id: number;

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

    constructor(id: number, nickname: string, manners: number, intro: string, profileURL: string) {
        this.id = id;
        this.nickname = nickname;
        this.manners = manners;
        this.intro = intro;
        this.profileURL = profileURL;
    }

    static fromUser(user: User) {
        return new GetUserResponseDto(user.id, user.nickname, user.manners, user.intro, user.profileURL);
    }
}