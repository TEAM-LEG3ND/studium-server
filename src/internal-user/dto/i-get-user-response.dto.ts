import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
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

    constructor(id: number, createdAt: Date, updatedAt: Date, universalAccountId: string, manners: number, intro: string, profileURL: string) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.universalAccountId = universalAccountId;
        this.manners = manners;
        this.intro = intro;
        this.profileURL = profileURL;
    }

    static fromUser(user: User) {
        return new InternalGetUserResponseDto(
            user.id,
            user.createdAt,
            user.updatedAt,
            user.universalAccountId,
            user.manners,
            user.intro,
            user.profileURL
        );
    }
}