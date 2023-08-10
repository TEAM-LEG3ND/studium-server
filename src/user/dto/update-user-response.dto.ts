import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsNumber, IsString, IsDate } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

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

    constructor(user: User) {
        this.id = user.id;
        this.updatedAt = user.updatedAt;
        this.manners = user.manners;
        this.intro = user.intro;
        this.profileURL = user.profileURL;
    }
}