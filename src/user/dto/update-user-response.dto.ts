import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class UpdateUserResponseDto {
    @ApiProperty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsDate()
    readonly updatedAt: Date;

    @ApiProperty()
    @IsNumber()
    readonly manners: number;
    
    @ApiProperty()
    @IsString()
    readonly intro: string;

    @ApiProperty()
    @IsString()
    readonly profileURL: string;

    constructor(id: number, updatedAt: Date, manners: number, intro: string, profileURL: string) {
        this.id = id;
        this.updatedAt = updatedAt;
        this.manners = manners;
        this.intro = intro;
        this.profileURL = profileURL;
    }

    static fromUser(user: User) {
        return new UpdateUserResponseDto(user.id, user.updatedAt, user.manners, user.intro, user.profileURL);
    }
}