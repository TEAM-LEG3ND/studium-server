import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';
import { Study, ApplyForm, Member } from '@prisma/client';

export class UpdateUserResponseDto{
    @ApiProperty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsDate()
    readonly updatedAt: Date;

    // todo db task
    // @ApiProperty()
    // readonly studyJoined: Study[];

    @ApiProperty()
    @IsNumber()
    readonly manners: number;

    // @ApiProperty()
    // readonly membersof: Member[];

    // @ApiProperty()
    // readonly applyForms: ApplyForm[];

    
    @ApiProperty()
    @IsString()
    readonly intro: string;

    @ApiProperty()
    @IsString()
    readonly profileURL: string;
}